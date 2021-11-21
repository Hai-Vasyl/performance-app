import { EntityRepository, Repository } from 'typeorm';

import { User } from 'src/entity';
import { getColor } from 'src/helpers/colorGenerator';
import { RegisterUserDto } from 'src/dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findUserById(id: number): Promise<User> {
    return this.findOne({ id });
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.findOne({ email });
  }

  async createUser(registerUserDto: RegisterUserDto): Promise<User> {
    const user = { ...this.create(), ...registerUserDto, avatar: getColor() };
    return this.save(user);
  }
}
