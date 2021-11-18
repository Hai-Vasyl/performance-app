import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/entity';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUsers(@Param('id') id): Promise<User> {
    return this.userService.getUserById(id);
  }

  // @Post('register')
  // getUsers(@Body() createUserDto: CreateUserDto): Promise<User> {
  //   return this.userService.getUserById(id);
  // }
}
