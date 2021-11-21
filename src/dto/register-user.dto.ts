import { UserRoles } from 'src/entity/user.entity';
export class RegisterUserDto {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: UserRoles;
}
