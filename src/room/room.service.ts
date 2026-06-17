import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { type UserSession } from '@thallesp/nestjs-better-auth';
import { JoinRoomDto } from './dto/join-room.dto';
import { ApproveMemberDto } from './dto/approve-member.dto';

@Injectable()
export class RoomService {
  constructor(private prismaService: PrismaService) {}

  async createRoom(createRoomDto: CreateRoomDto, session: UserSession) {
    const inviteCode = this.#generateInviteCode();

    const room = await this.prismaService.room.create({
      data: {
        inviteCode,
        name: createRoomDto.name,
        adminId: session.user.id,
      },
    });

    const roomMember = await this.prismaService.roomMember.create({
      data: {
        roomId: room.id,
        userId: session.user.id,
        role: 'ADMIN',
        isApproved: true,
      },
    });

    return {
      message: 'Room created successfully.',
      room,
      roomMember,
    };
  }

  async joinRoom(joinRoomDto: JoinRoomDto, session: UserSession) {
    const room = await this.prismaService.room.findUnique({
      where: { inviteCode: joinRoomDto.inviteCode },
    });

    if (!room) {
      throw new BadRequestException('Invalid invite code.');
    }

    const roomMember = await this.prismaService.roomMember.create({
      data: { roomId: room.id, userId: session.user.id },
    });

    return {
      message: 'Room joined successfully.',
      roomMember,
    };
  }

  async getRoom(roomId: string, session: UserSession) {
    const room = await this.prismaService.room.findUnique({
      where: { id: roomId },
      include: {
        members: true,
      },
    });

    if (!room) {
      throw new NotFoundException('Room with the given room id not found.');
    }

    const isRoomMember = room.members.some(
      (member) => member.userId === session.user.id,
    );

    if (!isRoomMember) {
      throw new NotFoundException('Join this room to get members.');
    }

    return {
      message: 'Fetched room successfully.',
      room,
    };
  }

  async approveMember(
    approveMemberDto: ApproveMemberDto,
    session: UserSession,
  ) {
    const room = await this.prismaService.room.findUnique({
      where: { id: approveMemberDto.roomId, adminId: session.user.id },
    });
    if (!room) {
      throw new NotFoundException(
        'Only admin of this room can approve members.',
      );
    }

    const member = await this.prismaService.roomMember.update({
      where: {
        roomId_userId: { userId: approveMemberDto.memberId, roomId: room.id },
      },
      data: {
        isApproved: true,
      },
    });

    return {
      message: 'Successfully approved memeber!',
      member,
    };
  }

  #generateInviteCode() {
    // Date.now().toString(36).slice(-6).toUpperCase()
    // crypto.randomBytes(4).toString('base64url').slice(0, 6).toUpperCase()
    return Date.now().toString(36).slice(-6).toUpperCase();
  }
}
