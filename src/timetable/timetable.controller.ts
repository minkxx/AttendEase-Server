import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { CreateTimetableBodyDto } from './dto/create-timetable.dto';

@Controller('rooms')
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @Post(':roomId/timetable')
  async createTimetable(
    @Param('roomId') roomId: string,
    @Body() body: CreateTimetableBodyDto,
  ) {
    return await this.timetableService.createTimetable({ roomId, ...body });
  }

  @Get(':roomId/timetable')
  async getTimetable(@Param('roomId') roomId: string) {
    return await this.timetableService.getTimetable(roomId);
  }
}
