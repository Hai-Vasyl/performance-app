import { EntityRepository, Repository } from 'typeorm';

import { User } from 'src/entity';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { getColor } from 'src/helpers/colorGenerator';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findUserById(id: number): Promise<User> {
    return this.findOne({ id });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = { ...this.create(), ...createUserDto, avatar: getColor() };
    return this.save(user);
  }
}
