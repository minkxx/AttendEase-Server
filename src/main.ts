import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodValidationPipe } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false, // <-- REQUIRED FOR BETTER AUTH
  });

  app.useGlobalPipes(new ZodValidationPipe());

  app.setGlobalPrefix('api', {
    exclude: ['/', 'health'],
  });

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
