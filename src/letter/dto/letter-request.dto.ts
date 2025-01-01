import { IsBoolean, IsISO8601, IsNotEmpty, IsString } from 'class-validator';

export class LetterRequestDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsISO8601()
  @IsNotEmpty()
  reminderDate: string;

  @IsBoolean()
  isPrivate: boolean;
}
