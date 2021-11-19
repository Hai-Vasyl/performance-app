import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { RegisterUserDto } from 'src/dto/register-user.dto';
import { UserRepository } from 'src/repository/user.repository';
import { AuthService } from 'src/auth/auth.service';
import { TokenDto } from 'src/dto/token.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<TokenDto> {
    await this.authService.registerValidateUser(registerUserDto.email);
    const hashPassword = bcrypt.hashSync(registerUserDto.password, 8);
    const user = await this.userRepository.createUser({
      ...registerUserDto,
      password: hashPassword,
    });

    return this.authService.login({ userId: user.id });
  }
}
