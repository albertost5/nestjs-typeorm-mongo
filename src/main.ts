import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const logger = new Logger();
  
  const PORT = configService.get('PORT') || 3000;

  await app.listen(PORT);
  logger.log(`Application listening on port ${PORT}`, 'NestApplication');
}
bootstrap();
