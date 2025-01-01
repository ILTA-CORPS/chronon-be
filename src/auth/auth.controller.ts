import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpStatus,
  HttpCode,
  Get,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../common/decorator/auth-user.decorator';
import { User as UserEntity } from '../user/entities/user.entity';
import { ResponseUserDto } from '../user/dto/response-user.dto';
import { ApiResponse } from '../common/utils/ApiResponse';
import { JwtAuthGuard } from './guards/JwtAuthGuard';
import { PreSignedUrl } from '../common/decorator/presigned-url.decorator';
import { ResponseDto } from '../common/decorator/response-dto.decorator';
import { SerializeV2Interceptor } from '../common/interceptor/serialize-v2.interceptor';
import { GoogleOauthGuard } from './guards/GoogleAuthGuard';
import { GoogleUserDto } from './dto/google-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @PreSignedUrl([
    { originalKey: 'profilePicturePath', urlKey: 'profilePictureUrl' },
  ])
  @ResponseDto(ResponseUserDto)
  @UseInterceptors(SerializeV2Interceptor)
  async getMe(@User() user: UserEntity) {
    return new ApiResponse('User fetched successfully', {
      ...user,
    });
  }

  @Post('register')
  @ResponseDto(ResponseUserDto)
  @UseInterceptors(SerializeV2Interceptor)
  async create(@Body() registerRequestDto: RegisterRequestDto) {
    return new ApiResponse(
      'User registered successfully',
      await this.authService.register(registerRequestDto),
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginRequestDto: LoginRequestDto, @Req() req: any) {
    return new ApiResponse(
      'User logged in successfully',
      await this.authService.login(loginRequestDto, req),
    );
  }

  @Post('refresh-token')
  @UseGuards(AuthGuard('refresh-token'))
  @HttpCode(HttpStatus.OK)
  async refresh(@User() user: UserEntity) {
    return {
      accessToken: await this.authService.refresh(user),
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('google')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req: any) {
    const user: GoogleUserDto = req.user;
    const token = await this.authService.handleGoogleAuth(user, req);
    return new ApiResponse('User logged in successfully', token);
  }
}
