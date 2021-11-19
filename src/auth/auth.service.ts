import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { UserRepository } from 'src/repository/user.repository';
import { User } from 'src/entity';
import { RegisterUserDto } from 'src/dto/register-user.dto';
import { JwtPayloadDto } from 'src/dto/jwt-payload.dto';
import { TokenDto } from 'src/dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async loginValidateUser({
    email,
    password,
  }: Partial<RegisterUserDto>): Promise<User> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User with this email is not exists');
    }

    const isValidPassword = bcrypt.compareSync(user.password, password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Password is wrong, try another one');
    }

    return user;
    // return {
    //   firstname: 'some name',
    //   lastname: 'some lastname',
    //   id: 2434,
    // } as User;
  }

  async registerValidateUser(email: string): Promise<void> {
    const user = await this.userRepository.findUserByEmail(email);

    if (user) {
      throw new UnauthorizedException('User with this email is already exists');
    }
  }

  login(jwtPayloadDto: JwtPayloadDto): TokenDto {
    return {
      access_token: this.jwtService.sign(jwtPayloadDto),
    };
  }
}
