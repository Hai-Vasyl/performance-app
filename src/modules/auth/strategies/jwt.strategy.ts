import { JwtPayloadDto } from '@/modules/auth/dtos';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';

export const jwtSecretProvider = Symbol('JWT_SECRET');

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(jwtSecretProvider) private readonly secterJWT: string) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secterJWT,
    });
  }

  async validate(jwtPayloadDto: JwtPayloadDto) {
    return jwtPayloadDto;
  }
}
