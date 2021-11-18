import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entity/user.entity';

@Injectable()
export class TodoService {
  // constructor(
  //   @InjectRepository(User) private userRepository: Repository<User>,
  // ) {}
  // getAllUsers() {
  //   return 'all users';
  // }
}
