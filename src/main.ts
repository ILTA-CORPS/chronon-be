import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { customValidationPipe } from './common/pipes/validation.pipe';
import { ResponseInterceptor } from './response/response.interceptor';
import { AppSingleton } from './common/singleton/app.singleton';
import { useContainer } from 'class-validator';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', true);
  app.useGlobalPipes(customValidationPipe());
  app.enableCors();
  app.useGlobalInterceptors(new ResponseInterceptor());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  AppSingleton.setInstance(app);
  await app.listen(3000);
}

bootstrap();
