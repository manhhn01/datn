import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/types/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);
  const appConfig = configService.getOrThrow<AppConfig>('app')
  await app.listen(appConfig.PORT);
}
bootstrap();
