import { Expose, Transform, plainToInstance } from 'class-transformer';

class UserDto {
  @Expose({ name: 'userUuid' })
  id: string;

  @Expose()
  fullName: string;

  @Expose({ name: 'profilePicturePath' })
  @Transform(
    ({ value }) => (value ? `https://storage.gariskode.com/${value}` : null),
    { toClassOnly: true },
  )
  profilePictureUrl: string | null;
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
  @Transform(
    ({ obj }) => {
      if (obj.isAnonymous) return undefined;
      return plainToInstance(UserDto, obj.user, {
        excludeExtraneousValues: true,
      });
    },
    { toClassOnly: true },
  )
  user: UserDto;
}
