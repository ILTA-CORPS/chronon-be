import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { CatchEverythingFilter } from './common/filters/http-exception.filter';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { StorageModule } from './storage/storage.module';
import { LetterModule } from './letter/letter.module';
import { IsNotExist } from './common/validators/is-not-exist.decorator';
import { IsExist } from './common/validators/is-exist.decorator';
import { HelperModule } from './helper/helper.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    LetterModule,
    NestjsFormDataModule.config({
      isGlobal: true,
      storage: MemoryStoredFile,
    }),
    StorageModule,
    HelperModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter,
    },
    IsNotExist,
    IsExist,
  ],
})
export class AppModule {}
