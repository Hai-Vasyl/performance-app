import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { UserRepository } from '@/modules/users/repositories/user.repository';
import { AuthService } from '@/modules/auth/auth.service';
import { JwtTokenDto } from '@/modules/auth/dtos';
import { LoginUserDto, RegisterUserDto } from '@/modules/users/dtos';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<JwtTokenDto> {
    await this.authService.registerValidateUser(registerUserDto);
    const hashPassword = bcrypt.hashSync(registerUserDto.password, 8);
    const user = await this.userRepository.createUser({
      ...registerUserDto,
      password: hashPassword,
    });

    return this.authService.login({ userId: user.id });
  }

  async loginUser(
    loginUserDto: LoginUserDto,
    userId: number,
  ): Promise<JwtTokenDto> {
    return this.authService.login({ userId });
  }
}
