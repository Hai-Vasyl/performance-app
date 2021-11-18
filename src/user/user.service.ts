import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserRepository } from 'src/repository/user.repository';

import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  getUserById(id: number): Promise<User> {
    return this.userRepository.findUserById(id);
  }

  // async registerUser(createUserDto: CreateUserDto): Promise<User> {
  //   const user = await this.userRepository.createUser(createUserDto);
  //   return
  // }
}
