import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false, // <-- REQUIRED FOR BETTER AUTH
  });

  app.useGlobalPipes(new ZodValidationPipe());

  app.setGlobalPrefix('api', {
    exclude: ['/', 'health'],
  });

  const adapterHost = app.get(HttpAdapterHost);

  app.useGlobalFilters(new PrismaExceptionFilter(adapterHost));

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
