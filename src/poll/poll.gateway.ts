import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Inject } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from '../redis/redis-client';
import { DATABASE_CONNECTION } from '../database/database-connection';
import { PrismaClient } from '../common/generated/prisma/client';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: 'polls',
})
export class PollingGateway implements OnGatewayConnection {
  @WebSocketServer() server!: Server;

  constructor(
    @Inject(REDIS_CLIENT) private readonly redis: Redis,
    @Inject(DATABASE_CONNECTION) private prismaService: PrismaClient,
  ) {}

  async handleConnection(client: Socket) {
    const roomId = client.handshake.query.roomId as string;
    if (roomId) {
      await client.join(`room:${roomId}`);
      console.log(`Socket ${client.id} joined channel room:${roomId}`);
    }
  }

  @SubscribeMessage('castVote')
  async handleCastVote(
    @MessageBody()
    payload: {
      roomId: string;
      pollId: string;
      userId: string;
      supportsBunk: boolean;
    },
  ) {
    const { roomId, pollId, userId, supportsBunk } = payload;
    const redisHashKey = `poll:${pollId}:votes`;

    await this.redis.hset(redisHashKey, userId, String(supportsBunk));

    this.prismaService.pollVote
      .upsert({
        where: {
          pollId_userId: { pollId, userId },
        },
        update: {
          supportsBunk,
        },
        create: {
          pollId,
          userId,
          supportsBunk,
        },
      })
      .catch((err) => console.error('Background DB Persistence Error:', err));

    const rawVotes = await this.redis.hgetall(redisHashKey);
    const totalVotes = Object.keys(rawVotes).length;
    const classSkipCount = Object.values(rawVotes).filter(
      (v) => v === 'true',
    ).length;

    const room = await this.prismaService.room.findUnique({
      where: { id: roomId },
      include: { members: true, polls: true },
    });

    const roomMembersCount =
      room?.members.filter((mem) => mem.isApproved).length ?? 0;

    const thresholdPercentage =
      room?.polls.filter((poll) => poll.id === pollId)[0].threshold ?? 50;

    const currentPercentage = (classSkipCount / roomMembersCount) * 100;
    const consensusReached = currentPercentage >= thresholdPercentage;

    this.server.to(`room:${roomId}`).emit('pollUpdated', {
      pollId,
      totalVotes,
      classSkipCount,
      percentage: Math.round(currentPercentage),
    });

    if (consensusReached) {
      await this.prismaService.bunkPoll.update({
        where: { id: pollId },
        data: { isLocked: true },
      });

      this.server.to(`room:${roomId}`).emit('pollLocked', {
        pollId,
        message: 'The pack has spoken. Class is skipped today.',
      });
    }
  }
}
