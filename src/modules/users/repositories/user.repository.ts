import { EntityRepository, Repository } from 'typeorm';

import { User } from '@/modules/users/entities/user.entity';
import { RegisterUserDto } from '@/modules/users/dtos/register-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findUserById(id: number): Promise<User> {
    return this.findOne({ id });
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.findOne({ email });
  }

  async createUser(registerUserDto: RegisterUserDto): Promise<User> {
    const user = {
      ...this.create(),
      ...registerUserDto,
    };
    return this.save(user);
  }
}
