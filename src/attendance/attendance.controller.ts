import { Body, Controller, Param, Post } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';
import { CreateAttendanceBodyDto } from './dto/create-attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

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
}
