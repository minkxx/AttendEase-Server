import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { RoomModule } from './room/room.module';
import { validateEnv } from './common/config/env.config';
import { TimetableModule } from './timetable/timetable.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateEnv,
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    RoomModule,
    TimetableModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
