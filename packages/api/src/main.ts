import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/types/config';
import { ResponseInterceptor } from 'src/pipelines/interceptors/response.interceptor';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);
  const appConfig = configService.getOrThrow<AppConfig>('app');

  app.use(cookieParser());
  app.enableCors({
    origin: [appConfig.WEB_URL],
    credentials: true,
  })

  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(appConfig.PORT);
}

bootstrap();
