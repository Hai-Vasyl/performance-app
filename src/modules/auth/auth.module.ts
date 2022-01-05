import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from '@/modules/users/repositories/user.repository';
import { AuthService } from '@/modules/auth/auth.service';
import { JwtStrategy, LocalStrategy } from '@/modules/auth/strategies';
import { jwtSecretProvider } from '@/modules/auth/strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    TypeOrmModule.forFeature([UserRepository]),
    // JwtModule.register({
    //   secret: 'izDl0UdA6Q2KGFEDiM8B97HQxxBpXcMcZw1PP650IW3o0PXgsE',
    //   signOptions: { expiresIn: '5h' },
    // }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get('jwt'),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: jwtSecretProvider,
      useFactory: async (configService: ConfigService) =>
        configService.get('JWT_SECRET'),
      inject: [ConfigService],
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
