import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { configurationService } from './config';

const PORT = configurationService.getValue('PORT');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use(cookieParser);
  await app.listen(PORT, () => `Listening to port: ${PORT}`);
}
bootstrap();
