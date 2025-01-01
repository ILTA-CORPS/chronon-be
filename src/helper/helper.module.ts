import { Module } from '@nestjs/common';
import { FileHelperService } from './file-helper.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [FileHelperService],
  exports: [FileHelperService],
})
export class HelperModule {}
