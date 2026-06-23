import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';
import { RedisIoAdapter } from './redis/redis-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false, // <-- REQUIRED FOR BETTER AUTH
  });

  app.useGlobalPipes(new ZodValidationPipe());

  app.setGlobalPrefix('api', {
    exclude: ['/', 'health'],
  });

  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  const adapterHost = app.get(HttpAdapterHost);

  app.useGlobalFilters(new PrismaExceptionFilter(adapterHost));

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
