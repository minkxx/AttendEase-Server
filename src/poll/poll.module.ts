import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { PollService } from './poll.service';
import { PollController } from './poll.controller';
import { PollingGateway } from './poll.gateway';
import { ConfigService } from '@nestjs/config';
import { PollSyncConsumer } from './poll-sync.consumer';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),

    BullModule.registerQueue({
      name: 'poll-sync',
    }),
  ],
  controllers: [PollController],
  providers: [PollService, PollingGateway, PollSyncConsumer],
})
export class PollModule {}
