import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-verify-token';
import { ConfigService } from '@nestjs/config';
import { GoogleUserDto } from '../dto/google-user.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { FileHelperService } from '../../helper/file-helper.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  Strategy,
  'google-verify-token',
) {
  constructor(
    configService: ConfigService,
    private readonly fileHelper: FileHelperService,
  ) {
    super({
      clientID: configService.getOrThrow<string>('GOOGLE_CLIENT_ID'),
    });
  }

  /**
   * Validate callback called by the passport-google-verify-token strategy.
   *
   * @param parsedToken
   * @param googleId
   * @param done
   */
  async validate(parsedToken: any, googleId: string, done: any) {
    const payload = JSON.parse(parsedToken.body);
    const picture = await this.fileHelper.fromUrl(payload.picture);

    const user = {
      googleId: payload.sub,
      email: payload.email,
      fullName: payload.name,
      picture,
    };

    const userDto = plainToInstance(GoogleUserDto, user);
    const errors = await validate(userDto);

    if (errors.length > 0) {
      throw new UnauthorizedException('Unauthorized');
    }
    done(null, userDto);
  }
}
