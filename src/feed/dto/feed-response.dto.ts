import { Expose, Type } from 'class-transformer';

class UserDto {
  @Expose({ name: 'userUuid' })
  id: string;

  @Expose({ name: 'fullName' })
  fullName: string;
}

export class FeedResponseDto {
  @Expose({ name: 'letterUuid' })
  id: string;

  @Expose()
  content: string;

  @Expose()
  reminderDate: Date;

  @Expose()
  isPrivate: boolean;

  @Expose()
  isAnonymous: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;
}
