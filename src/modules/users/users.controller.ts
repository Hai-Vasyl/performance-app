import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from '@/modules/auth/auth.service';
import { JwtAuthGuard, LocalAuthGuard } from '@/shared/guards/auth';
import { UserService } from '@/modules/users/users.service';
import { RegisterUserDto, LoginUserDto } from '@/modules/users/dtos';
import { JwtTokenDto } from '@/modules/auth/dtos';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // @UseGuards(JwtAuthGuard)
  // @Get('protected')
  // getUsers(@Request() req): any {
  //   return req.user;
  // }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  loginUser(
    @Body() loginUserDto: LoginUserDto,
    @Request() { user },
  ): Promise<JwtTokenDto> {
    return this.userService.loginUser(loginUserDto, user.id);
  }

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto): Promise<JwtTokenDto> {
    return this.userService.registerUser(registerUserDto);
  }
}
