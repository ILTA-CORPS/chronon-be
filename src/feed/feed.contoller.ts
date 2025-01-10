import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { Serialize } from '../common/interceptor/serialize.interceptor';
import { FeedResponseDto } from './dto/feed-response.dto';
import { ApiResponse } from '../common/utils/ApiResponse';
import { PreSignedUrl } from '../common/decorator/presigned-url.decorator';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  @PreSignedUrl([
    { originalKey: 'profilePicturePath', urlKey: 'profilePictureUrl' },
  ])
  @Serialize(FeedResponseDto)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('search', new DefaultValuePipe('')) search: string,
  ) {
    return new ApiResponse(
      'Letters retrieved successfully',
      await this.feedService.findAll({ page, limit, search }),
    );
  }

  @Get(':uuid')
  @Serialize(FeedResponseDto)
  async findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return new ApiResponse(
      'Letter fetched successfully',
      await this.feedService.findOne(uuid),
    );
  }
}
