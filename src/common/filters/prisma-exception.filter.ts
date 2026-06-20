import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { Prisma } from '../../common/generated/prisma/client';

const PRISMA_ERROR_MAP: Record<string, HttpStatus> = {
  P2000: HttpStatus.BAD_REQUEST,
  P2002: HttpStatus.CONFLICT,
  P2025: HttpStatus.NOT_FOUND,
};

const PRISMA_ERROR_MESSAGES: Record<string, string> = {
  P2000: 'The provided value is too long for this field.',
  P2002: 'A record with this value already exists.',
  P2025: 'The requested record was not found.',
};

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);
  private readonly httpAdapter: AbstractHttpAdapter;

  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const code = exception.code;

    const statusCode =
      PRISMA_ERROR_MAP[code] ?? HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      PRISMA_ERROR_MESSAGES[code] ?? 'An unexpected database error occurred.';

    this.logger.error(
      `Prisma error ${code}: ${exception.message}`,
      exception.stack,
    );

    this.httpAdapter.reply(
      ctx.getResponse(),
      {
        statusCode,
        message,
        prismaCode: code,
      },
      statusCode,
    );
  }
}
