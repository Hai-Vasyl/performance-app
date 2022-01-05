import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { UserRepository } from '@/modules/users/repositories/user.repository';
import { LoginUserDto, RegisterUserDto } from '@/modules/users/dtos';
import { JwtPayloadDto, JwtTokenDto } from '@/modules/auth/dtos';
import { User } from '@/modules/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async loginValidateUser({ email, password }: LoginUserDto): Promise<User> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException([
        {
          message: 'User with this email in not exists',
          param: 'email',
        },
      ]);
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException([
        {
          message: 'Password is wrong, try another one',
          param: 'password',
        },
      ]);
    }

    return user;
  }

  async registerValidateUser({
    email,
  }: Partial<RegisterUserDto>): Promise<void> {
    const user = await this.userRepository.findUserByEmail(email);

    if (user) {
      throw new UnauthorizedException([
        {
          message: 'User with this email is already exists',
          param: 'email',
        },
      ]);
    }
  }

  login(jwtPayloadDto: JwtPayloadDto): JwtTokenDto {
    return {
      access_token: this.jwtService.sign(jwtPayloadDto),
    };
  }
}
