import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  Validate,
} from 'class-validator';
import { Match } from '../../common/validators/match.decorator';
import { User as UserEntity } from '../../user/entities/user.entity';
import { IsNotExist } from '../../common/validators/is-not-exist.decorator';

export class RegisterRequestDto {
  @IsNotEmpty({ message: 'Please enter your full name.' })
  @IsString({ message: 'Full name must be a string.' })
  @MaxLength(255, { message: 'Full name must be less than 255 characters.' })
  fullName: string;

  @IsEmail({}, { message: 'Please enter a valid email address.' })
  @Validate(IsNotExist, [UserEntity, 'email'], {
    message: 'Email is already taken.',
  })
  email: string;

  @IsNotEmpty({ message: 'Please enter a password.' })
  @IsStrongPassword(
    {
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minLength: 8,
      minSymbols: 0,
    },
    { message: 'Password is too weak' },
  )
  password: string;

  @IsNotEmpty({ message: 'Password confirmation is required' })
  @Match('password', { message: 'Password doest not match' })
  passwordConfirmation: string;
}
