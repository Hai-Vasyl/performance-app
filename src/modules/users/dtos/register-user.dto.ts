import { UserRoles } from '@/modules/users/entities/user.entity';

export class RegisterUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRoles;
}
