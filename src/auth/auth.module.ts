import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User as UserEntity } from '../user/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserModule } from '../user/user.module';
import { RefreshTokenStrategy } from './strategy/refresh-token.strategy';
import { StorageModule } from '../storage/storage.module';
import { GoogleStrategy } from './strategy/google.strategy';
import { HttpModule } from '@nestjs/axios';
import { HelperModule } from '../helper/helper.module';
import { FileHelperService } from '../helper/file-helper.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.register({}),
    UserModule,
    StorageModule,
    HttpModule,
    HelperModule,
  ],

  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    RefreshTokenStrategy,
    GoogleStrategy,
    FileHelperService,
  ],
})
export class AuthModule {}
