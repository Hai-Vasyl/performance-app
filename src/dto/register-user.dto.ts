import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

import { UserRoles } from 'src/entity/user.entity';
import { ValidationMessages } from '../config/validation.config';

const { IS_NOT_EMPTY, MAX_LENGTH } = ValidationMessages;

export class RegisterUserDto {
  // @IsNotEmpty({
  //   message: IS_NOT_EMPTY,
  // })
  // @MaxLength(25, {
  //   message: MAX_LENGTH,
  // })
  readonly firstname: string;

  // @IsNotEmpty({
  //   message: IS_NOT_EMPTY,
  // })
  // @MaxLength(25, {
  //   message: MAX_LENGTH,
  // })
  readonly lastname: string;

  // @IsNotEmpty({
  //   message: IS_NOT_EMPTY,
  // })
  // @IsEmail()
  readonly email: string;

  // @IsNotEmpty({
  //   message: IS_NOT_EMPTY,
  // })
  readonly password: string;

  readonly role: UserRoles;
}
