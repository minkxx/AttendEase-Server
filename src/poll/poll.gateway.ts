import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Inject, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from '../redis/redis-client';
import { DATABASE_CONNECTION } from '../database/database-connection';
import { PrismaClient } from '../common/generated/prisma/client';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

interface CastVotePayload {
  roomId: string;
  pollId: string;
  userId: string;
  supportsBunk: boolean;
}

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: 'polls',
})
export class PollingGateway implements OnGatewayConnection {
  @WebSocketServer() server!: Server;
  private readonly logger = new Logger(PollingGateway.name);

  constructor(
    @Inject(REDIS_CLIENT) private readonly redis: Redis,
    @Inject(DATABASE_CONNECTION) private readonly prisma: PrismaClient,
    @InjectQueue('poll-sync') private readonly pollSyncQueue: Queue,
  ) {}

  async handleConnection(client: Socket) {
    const roomId = client.handshake.query.roomId as string;
    if (roomId) {
      await client.join(`room:${roomId}`);
      this.logger.log(`client:${client.id} joined room:${roomId}`);
    }
  }

  @SubscribeMessage('castVote')
  async handleCastVote(@MessageBody() payload: CastVotePayload) {
    const { roomId, pollId, userId, supportsBunk } = payload;

    if (!roomId || !pollId || !userId) return;

    const redisHashKey = `poll:${pollId}:votes`;

    const [poll, roomMember] = await Promise.all([
      this.prisma.bunkPoll.findUnique({ where: { id: pollId } }),
      this.prisma.roomMember.findUnique({
        where: { roomId_userId: { roomId, userId } },
      }),
    ]);

    if (!poll) {
      return this.server
        .to(`room:${roomId}`)
        .emit('pollError', { pollId, message: 'Poll does not exist.' });
    }

    console.log('Poll expired: ', poll.expiresAt.getTime() < Date.now());
    console.log('Member not verified: ', !roomMember || !roomMember.isApproved);

    if (poll.isLocked || poll.expiresAt.getTime() < Date.now()) {
      return this.server.to(`room:${roomId}`).emit('pollError', {
        pollId,
        message: 'Poll is either locked or expired.',
      });
    }

    if (!roomMember || !roomMember.isApproved) {
      return this.server.to(`room:${roomId}`).emit('pollError', {
        pollId,
        message:
          'You are not an eligible member in this room to cast your vote.',
      });
    }

    await this.redis.hset(redisHashKey, userId, String(supportsBunk));
    const secondsUntilExpiry = Math.ceil(
      (poll.expiresAt.getTime() - Date.now()) / 1000,
    );
    const safetyBuffer = 3600;
    await this.redis.expire(redisHashKey, secondsUntilExpiry + safetyBuffer);

    const approvedMembersCount = await this.prisma.roomMember.count({
      where: { roomId, isApproved: true },
    });

    const rawVotes = await this.redis.hgetall(redisHashKey);
    const totalVotes = Object.keys(rawVotes).length;
    const classSkipCount = Object.values(rawVotes).filter(
      (v) => v === 'true',
    ).length;

    const currentPercentage =
      approvedMembersCount > 0
        ? (classSkipCount / approvedMembersCount) * 100
        : 0;
    const consensusReached = currentPercentage >= poll.threshold;

    this.server.to(`room:${roomId}`).emit('pollUpdated', {
      pollId,
      totalVotes,
      classSkipCount,
      percentage: Math.round(currentPercentage),
    });

    if (consensusReached) {
      await this.prisma.bunkPoll.update({
        where: { id: pollId },
        data: { isLocked: true },
      });

      await this.redis.del(redisHashKey);

      this.server.to(`room:${roomId}`).emit('pollLocked', {
        pollId,
        message: 'The pack has spoken. Class is skipped today.',
      });
    }

    await this.pollSyncQueue.add(
      'flush-to-postgres',
      { pollId, rawVotes },
      { jobId: `sync-${pollId}`, removeOnComplete: true },
    );
    this.logger.log(`poll-sync job queued with jobId:sync-${pollId}`);
  }
}
