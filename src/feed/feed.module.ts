import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.contoller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Letter as LetterEntity } from '../letter/entities/letter.entity';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [TypeOrmModule.forFeature([LetterEntity]), StorageModule],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
