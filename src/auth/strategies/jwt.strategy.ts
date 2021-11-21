import { getConfigToken } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayloadDto } from 'src/dto';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: getConfigToken('JWT_SECRET'),
    });
  }

  async validate(jwtPayloadDto: JwtPayloadDto) {
    return jwtPayloadDto;
  }
}
