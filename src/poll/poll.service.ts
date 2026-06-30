import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/database-connection';
import { PrismaClient } from '../common/generated/prisma/client';
import { CreatePollDto } from './dto/create-poll.dto';
import { type UserSession } from '@thallesp/nestjs-better-auth';

@Injectable()
export class PollService {
  constructor(
    @Inject(DATABASE_CONNECTION) private prismaService: PrismaClient,
  ) {}

  async createPoll(createPollDto: CreatePollDto, session: UserSession) {
    const room = await this.prismaService.room.findUnique({
      where: { id: createPollDto.roomId, adminId: session.user.id },
    });

    if (!room) {
      return {
        message: 'You are not admin in this room to create a timetable.',
      };
    }

    const poll = await this.prismaService.bunkPoll.create({
      data: createPollDto,
    });

    return {
      message: 'Poll created successfully.',
      poll,
    };
  }
}
