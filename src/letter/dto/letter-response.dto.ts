import { Expose } from 'class-transformer';

export class LetterResponseDto {
  @Expose({ name: 'letterUuid' })
  id: string;

  @Expose()
  content: string;

  @Expose()
  reminderDate: Date;

  @Expose()
  isPrivate: boolean;

  @Expose()
  createdAt: boolean;
}
