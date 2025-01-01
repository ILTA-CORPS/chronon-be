import { Module } from '@nestjs/common';
import { LetterService } from './letter.service';
import { LetterController } from './letter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Letter as LetterEntity } from './entities/letter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LetterEntity])],
  controllers: [LetterController],
  providers: [LetterService],
})
export class LetterModule {}
