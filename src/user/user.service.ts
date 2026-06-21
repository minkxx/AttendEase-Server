import { Inject, Injectable } from '@nestjs/common';
import { type UserSession } from '@thallesp/nestjs-better-auth';
import { PrismaClient } from '../common/generated/prisma/client';
import { DATABASE_CONNECTION } from '../database/database-connection';

@Injectable()
export class UserService {
  constructor(
    @Inject(DATABASE_CONNECTION) private prismaService: PrismaClient,
  ) {}

  getProfile(session: UserSession) {
    return session.user;
  }

  async findByEmail(email: string) {
    return await this.prismaService.user.findUnique({ where: { email } });
  }
}
