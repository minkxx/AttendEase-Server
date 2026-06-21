import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTimetableDto } from './dto/create-timetable.dto';

@Injectable()
export class TimetableService {
  constructor(private prismaService: PrismaService) {}

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
