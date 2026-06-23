import { Module } from '@nestjs/common';
import { PollService } from './poll.service';
import { PollController } from './poll.controller';
import { PollingGateway } from './poll.gateway';

@Module({
  controllers: [PollController],
  providers: [PollService, PollingGateway],
})
export class PollModule {}
