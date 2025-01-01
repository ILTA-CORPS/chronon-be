import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { StorageService } from '../../storage/storage.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly storageService: StorageService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      if (info && info instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token expired');
      }
      if (info && info instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Invalid token');
      }
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
