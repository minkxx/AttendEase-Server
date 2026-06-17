import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';
import { JoinRoomDto } from './dto/join-room.dto';
import { ApproveMemberDto } from './dto/approve-member.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('create')
  async createRoom(
    @Body() createRoomDto: CreateRoomDto,
    @Session() session: UserSession,
  ) {
    return await this.roomService.createRoom(createRoomDto, session);
  }

  @Post('join')
  async joinRoom(
    @Body() joinRoomDto: JoinRoomDto,
    @Session() session: UserSession,
  ) {
    return await this.roomService.joinRoom(joinRoomDto, session);
  }

  @Get(':id')
  async getRoom(@Param('id') id: string, @Session() session: UserSession) {
    return await this.roomService.getRoom(id, session);
  }

  @Post('member/approve')
  async approveMember(
    @Body() approveMemberDto: ApproveMemberDto,
    @Session() session: UserSession,
  ) {
    return await this.roomService.approveMember(approveMemberDto, session);
  }
}
