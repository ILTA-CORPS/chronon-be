import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MemoryStoredFile } from 'nestjs-form-data';
import * as Minio from 'minio';

@Injectable()
export class StorageService {
  private minioClient: Minio.Client;

  constructor(private readonly configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: this.configService.getOrThrow('S3_STORAGE_ENDPOINT'),
      useSSL: true,
      accessKey: this.configService.getOrThrow('S3_STORAGE_KEY'),
      secretKey: this.configService.getOrThrow('S3_STORAGE_SECRET'),
    });
  }

  public async uploadFile(filePath: string, file: MemoryStoredFile) {
    const nanoid = await this.generateId();
    const objectName = `${filePath}/${nanoid}.${file.extension}`;
    await this.minioClient.putObject(
      this.configService.getOrThrow('S3_STORAGE_BUCKET'),
      objectName,
      file.buffer,
      file.size,
      {
        'Content-Type': file.mimetype,
      },
    );

    return objectName;
  }

  public async deleteFile(filePath: string) {
    await this.minioClient.removeObject(
      this.configService.getOrThrow('S3_STORAGE_BUCKET'),
      filePath,
    );
  }

  public async getPreSignedUrl(filePath: string) {
    return await this.minioClient.presignedGetObject(
      this.configService.getOrThrow('S3_STORAGE_BUCKET'),
      filePath,
      60 * 60,
    );
  }

  public async generateId() {
    const module = await (eval('import("nanoid")') as Promise<
      typeof import('nanoid')
    >);
    return module.nanoid(48);
  }
}
