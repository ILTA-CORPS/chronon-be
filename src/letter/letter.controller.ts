import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
  Put,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { LetterService } from './letter.service';
import { LetterRequestDto } from './dto/letter-request.dto';
import { JwtAuthGuard } from '../auth/guards/JwtAuthGuard';
import { User as UserEntity } from '../user/entities/user.entity';
import { User } from '../common/decorator/auth-user.decorator';
import { Serialize } from '../common/interceptor/serialize.interceptor';
import { LetterResponseDto } from './dto/letter-response.dto';
import { ApiResponse } from '../common/utils/ApiResponse';

@Controller('letter')
export class LetterController {
  constructor(private readonly letterService: LetterService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @Serialize(LetterResponseDto)
  async create(
    @Body() createLetterDto: LetterRequestDto,
    @User() user: UserEntity,
  ) {
    return new ApiResponse(
      'Letter created successfully',
      await this.letterService.create(createLetterDto, user),
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Serialize(LetterResponseDto)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('search', new DefaultValuePipe('')) search: string,
    self: boolean,
    @User() user: UserEntity,
  ) {
    return new ApiResponse(
      'Letters retrieved successfully',
      await this.letterService.paginate(user, { page, limit, search }),
    );
  }

  @Get(':uuid')
  @UseGuards(JwtAuthGuard)
  @Serialize(LetterResponseDto)
  async findOne(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @User() user: UserEntity,
  ) {
    return new ApiResponse(
      'Letter fetched successfully',
      await this.letterService.findOne(uuid, user),
    );
  }

  @Put(':uuid')
  @UseGuards(JwtAuthGuard)
  @Serialize(LetterResponseDto)
  async update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @User() user: UserEntity,
    @Body() letterRequestDto: LetterRequestDto,
  ) {
    return new ApiResponse(
      'Letter updated successfully',
      await this.letterService.update(uuid, user, letterRequestDto),
    );
  }

  @Delete(':uuid')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @User() user: UserEntity,
  ) {
    await this.letterService.remove(uuid, user);
    return new ApiResponse('Letter removed successfully');
  }
}
