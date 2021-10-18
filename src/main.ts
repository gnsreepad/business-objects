import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomExceptionsFilter } from './exception/exception.filter';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const logger = LoggerService.getInstance('bootstrap()');
  app.setGlobalPrefix('sales-force/api');
  await app.listen(configService.get('PORT') || 5000);
  app.useGlobalFilters(new CustomExceptionsFilter());
  logger.info(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
