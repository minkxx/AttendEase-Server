import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { CreateTimetableBodyDto } from './dto/create-timetable.dto';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';

@Controller('rooms')
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @Post(':roomId/timetable')
  async createTimetable(
    @Param('roomId') roomId: string,
    @Body() body: CreateTimetableBodyDto,
    @Session() session: UserSession,
  ) {
    return await this.timetableService.createTimetable(
      { roomId, ...body },
      session,
    );
  }

  @Get(':roomId/timetable')
  async getTimetable(@Param('roomId') roomId: string) {
    return await this.timetableService.getTimetable(roomId);
  }
}
