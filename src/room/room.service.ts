import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes } from 'crypto';
import { CreateRoomDto } from './dto/create-room.dto';
import { type UserSession } from '@thallesp/nestjs-better-auth';
import { JoinRoomDto } from './dto/join-room.dto';
import { ApproveMemberDto } from './dto/approve-member.dto';
import { DATABASE_CONNECTION } from '../database/database-connection';
import { PrismaClient } from '../common/generated/prisma/client';

@Injectable()
export class RoomService {
  constructor(
    @Inject(DATABASE_CONNECTION) private prismaService: PrismaClient,
  ) {}

  async createRoom(createRoomDto: CreateRoomDto, session: UserSession) {
    const inviteCode = this.#generateInviteCode();

    const { room, roomMember } = await this.prismaService.$transaction(
      async (tx) => {
        const newRoom = await tx.room.create({
          data: {
            inviteCode,
            name: createRoomDto.name,
            adminId: session.user.id,
          },
        });

        const newRoomMember = await tx.roomMember.create({
          data: {
            roomId: newRoom.id,
            userId: session.user.id,
            role: 'ADMIN',
            isApproved: true,
          },
        });

        return { room: newRoom, roomMember: newRoomMember };
      },
    );

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
    const [room, roomMember] = await this.prismaService.$transaction([
      this.prismaService.room.findUnique({
        where: { id: roomId },
      }),
      this.prismaService.roomMember.findFirst({
        where: { roomId, userId: session.user.id },
      }),
    ]);

    if (!room) {
      throw new NotFoundException('Room with the given room id not found.');
    }

    if (!roomMember) {
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
      message: 'Successfully approved member!',
      member,
    };
  }

  #generateInviteCode(): string {
    return randomBytes(6).toString('base64url').toUpperCase();
  }
}
