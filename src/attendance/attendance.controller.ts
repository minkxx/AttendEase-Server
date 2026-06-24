import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';
import { CreateAttendanceBodyDto } from './dto/create-attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get('all')
  async getAllAttendance(@Session() session: UserSession) {
    return await this.attendanceService.getAllAttendance(session);
  }

  @Get(':timetableId')
  async getAttendance(
    @Param('timetableId') timetableId: string,
    @Session() session: UserSession,
  ) {
    return await this.attendanceService.getAttendance(session, timetableId);
  }

  @Post(':timetableId/mark')
  async markAttendance(
    @Param('timetableId') timetableId: string,
    @Session() session: UserSession,
    @Body() body: CreateAttendanceBodyDto,
  ) {
    return await this.attendanceService.markAttendance({
      userId: session.user.id,
      timetableId,
      ...body,
    });
  }

  @Post(':timetableId/update')
  async updateAttendance(
    @Param('timetableId') timetableId: string,
    @Session() session: UserSession,
    @Body() body: CreateAttendanceBodyDto,
  ) {
    return await this.attendanceService.updateAttendance({
      userId: session.user.id,
      timetableId,
      ...body,
    });
  }
}
