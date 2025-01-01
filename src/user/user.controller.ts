import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/JwtAuthGuard';
import { User } from '../common/decorator/auth-user.decorator';
import { User as UserEntity } from '../user/entities/user.entity';
import { Serialize } from '../common/interceptor/serialize.interceptor';
import { ResponseUserDto } from './dto/response-user.dto';
import { ApiResponse } from '../common/utils/ApiResponse';
import { StorageService } from '../storage/storage.service';
@Controller('profile')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly storageService: StorageService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  @Serialize(ResponseUserDto)
  async getProfile(@User() user: UserEntity) {
    const profilePictureUrl = user.profilePicturePath
      ? await this.storageService.getPreSignedUrl(user.profilePicturePath)
      : null;
    return new ApiResponse('User fetched successfully', {
      ...user,
      profilePictureUrl,
    });
  }
}
