import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { LocalAuthGuard, JwtAuthGuard } from 'src/guards';
import { UserService } from './user.service';
import { TokenDto, RegisterUserDto } from 'src/dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getUsers(@Request() req): any {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  loginUser(@Request() req): TokenDto {
    return this.authService.login({ userId: Number(req.user.id) });
  }

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto): Promise<TokenDto> {
    return this.userService.registerUser(registerUserDto);
  }
}
