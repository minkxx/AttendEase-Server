import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Inject, Logger } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/database-connection';
import { PrismaClient } from '../common/generated/prisma/client';

interface PollSyncJobData {
  pollId: string;
  rawVotes: Record<string, string>;
}

@Processor('poll-sync')
export class PollSyncConsumer extends WorkerHost {
  private readonly logger = new Logger(PollSyncConsumer.name);

  constructor(
    @Inject(DATABASE_CONNECTION) private readonly prisma: PrismaClient,
  ) {
    super();
  }

  async process(job: Job<PollSyncJobData>): Promise<void> {
    const { pollId, rawVotes } = job.data;

    if (!rawVotes || Object.keys(rawVotes).length === 0) {
      this.logger.warn(
        `No active vote map provided in job payload for Poll: ${pollId}`,
      );
      return;
    }

    this.logger.log(
      `Starting background database sync sequence for Poll: ${pollId}`,
    );

    try {
      await this.prisma.$transaction(
        Object.entries(rawVotes).map(([userId, supportsBunk]) => {
          const isSupporting = supportsBunk === 'true';
          return this.prisma.pollVote.upsert({
            where: {
              pollId_userId: { pollId, userId },
            },
            update: {
              supportsBunk: isSupporting,
            },
            create: {
              pollId,
              userId,
              supportsBunk: isSupporting,
            },
          });
        }),
      );

      this.logger.log(`Database synchronization complete for Poll: ${pollId}`);
    } catch (error) {
      this.logger.error(
        `❌ Failed to sync votes database matrix for Poll: ${pollId}`,
        error,
      );
      throw error;
    }
  }
}
