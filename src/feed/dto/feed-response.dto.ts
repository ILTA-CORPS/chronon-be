import { Expose, Type, Transform } from 'class-transformer';

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

  // Biasanya ini Date, bukan boolean
  @Expose()
  createdAt: Date;

  // Apakah memang butuh array? Jika hanya satu user, jadikan user: UserDto
  @Expose()
  @Type(() => UserDto)
  items: UserDto;
}

export class UserDto {
  @Expose()
  @Transform(({ obj }) => obj.user?.userUuid)
  id: string;

  @Expose()
  @Transform(({ obj }) => obj.user?.fullName)
  name: string;
}
