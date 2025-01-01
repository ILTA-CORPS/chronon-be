import { Exclude, Expose } from 'class-transformer';

export class ResponseUserDto {
  @Expose({ name: 'userUuid' }) // Maps `userUuid` in plain object to `id` in class
  id: string;

  @Expose()
  fullName: string;

  @Expose()
  email: string;

  @Expose()
  emailVerifiedAt: Date | null;

  @Expose()
  isActive: boolean;

  @Expose()
  profilePictureUrl: string | null;

  @Exclude()
  profilePicturePath: string | null;

  @Expose()
  lastLoginAt: Date | null;

  @Expose()
  lastLoginIp: string | null;

  @Expose()
  phoneNumber: string | null;
}
