import { Module } from '@nestjs/common';
import { AuthModule as NestjsBetterAuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './auth.config';

@Module({
  imports: [
    NestjsBetterAuthModule.forRoot({
      auth,
      bodyParser: {
        json: { limit: '2mb' },
        urlencoded: { limit: '2mb', extended: true },
        rawBody: true,
      },
    }),
  ],
  exports: [NestjsBetterAuthModule],
})
export class AuthModule {}
