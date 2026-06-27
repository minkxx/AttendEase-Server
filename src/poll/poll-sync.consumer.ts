import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Inject, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from '../redis/redis-client';
import { DATABASE_CONNECTION } from '../database/database-connection';
import { PrismaClient } from '../common/generated/prisma/client';

@Processor('poll-sync')
export class PollSyncConsumer extends WorkerHost {
  private readonly logger = new Logger(PollSyncConsumer.name);

  constructor(
    @Inject(REDIS_CLIENT) private readonly redis: Redis,
    @Inject(DATABASE_CONNECTION) private prismaService: PrismaClient,
  ) {
    super();
  }

  async process(job: Job<{ pollId: string }>): Promise<void> {
    const { pollId } = job.data;
    const redisHashKey = `poll:${pollId}:votes`;

    this.logger.log(
      `Starting background database sync sequence for Poll: ${pollId}`,
    );

    const rawVotes = await this.redis.hgetall(redisHashKey);
    const votePairs = Object.entries(rawVotes);

    if (votePairs.length === 0) {
      this.logger.warn(
        `No active vote memory map found in Redis for Poll: ${pollId}`,
      );
      return;
    }

    const dataToInsert = votePairs.map(([userId, supportsBunk]) => ({
      pollId,
      userId,
      supportsBunk: supportsBunk === 'true',
    }));

    try {
      await this.prismaService.pollVote.createMany({
        data: dataToInsert,
        skipDuplicates: true,
      });

      await this.redis.del(redisHashKey);

      this.logger.log(
        `Database synchronization complete. Cleaned up Redis cache key: ${redisHashKey}`,
      );
    } catch (error) {
      this.logger.error(
        `❌ Failed to sync votes database matrix for Poll: ${pollId}`,
        error,
      );
      throw error;
    }
  }
}
