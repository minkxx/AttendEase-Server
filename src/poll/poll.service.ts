import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/database-connection';
import { PrismaClient } from '../common/generated/prisma/client';
import { CreatePollDto } from './dto/create-poll.dto';

@Injectable()
export class PollService {
  constructor(
    @Inject(DATABASE_CONNECTION) private prismaService: PrismaClient,
  ) {}

  async createPoll(createPollDto: CreatePollDto) {
    const poll = await this.prismaService.bunkPoll.create({
      data: createPollDto,
    });

    return {
      message: 'Poll created successfully.',
      poll,
    };
  }
}
