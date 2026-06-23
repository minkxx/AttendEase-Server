import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/database-connection';
import { PrismaClient } from '../common/generated/prisma/client';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @Inject(DATABASE_CONNECTION) private prismaService: PrismaClient,
  ) {}

  async markAttendance(createAttendanceDto: CreateAttendanceDto) {
    const attendance = await this.prismaService.attendance.create({
      data: createAttendanceDto,
    });

    return {
      message: 'Attendance marked successfully.',
      attendance,
    };
  }
}
