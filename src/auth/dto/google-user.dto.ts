import { IsEmail, IsString } from 'class-validator';
import { IsFile, MemoryStoredFile } from 'nestjs-form-data';

export class GoogleUserDto {
  @IsString()
  googleId: string;

  @IsEmail()
  email: string;

  @IsString()
  fullName: string;

  @IsFile()
  picture: MemoryStoredFile;
}
