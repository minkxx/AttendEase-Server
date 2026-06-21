import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTimetableDto } from './dto/create-timetable.dto';
import { DATABASE_CONNECTION } from '../database/database-connection';
import { PrismaClient } from '../common/generated/prisma/client';

@Injectable()
export class TimetableService {
  constructor(
    @Inject(DATABASE_CONNECTION) private prismaService: PrismaClient,
  ) {}

  async createTimetable(createTimetableDto: CreateTimetableDto) {
    const timetable = await this.prismaService.timetable.create({
      data: createTimetableDto,
    });
    return {
      message: 'Timetable created successfully.',
      timetable,
    };
  }

  async getTimetable(roomId: string) {
    const timetable = await this.prismaService.timetable.findMany({
      where: { roomId },
    });

    if (!timetable || timetable.length < 1) {
      throw new NotFoundException('Timetable for this room not found!');
    }

    return {
      message: 'Timetable fetched successfully.',
      timetable,
    };
  }
}
