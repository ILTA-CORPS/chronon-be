import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Readable } from 'stream';
import { DEFAULT_CONFIG } from 'nestjs-form-data/dist/config/default.config';
import { ParticleStoredFile } from 'nestjs-form-data/dist/interfaces/ParticleStoredFile';
import { MemoryStoredFile } from 'nestjs-form-data';

@Injectable()
export class FileHelperService {
  constructor(private readonly httpService: HttpService) {}

  public async fromUrl(url: string) {
    const response = await lastValueFrom(
      this.httpService.get(url, { responseType: 'arraybuffer' }),
    );
    const buffer = Buffer.from(response.data);
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);

    const originalName =
      response.headers['content-disposition'].match(/filename="([^"]+)"/);

    if (!originalName) {
      throw new InternalServerErrorException('File name not found');
    }

    const fileMeta: ParticleStoredFile = {
      originalName: originalName[1],
      encoding: 'binary',
      mimetype: response.headers['content-type'],
    };

    return await MemoryStoredFile.create(fileMeta, stream, DEFAULT_CONFIG);
  }
}
