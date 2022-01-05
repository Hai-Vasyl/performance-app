import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@/modules/auth/auth.module';
import { UserRepository } from '@/modules/users/repositories/user.repository';
import { UserController } from '@/modules/users/users.controller';
import { UserService } from '@/modules/users/users.service';

@Module({
  imports: [
    // forwardRef(() => ),
    AuthModule,
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
