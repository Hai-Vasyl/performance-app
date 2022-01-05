import { registerAs } from '@nestjs/config';

export const jwtConfig = registerAs('jwt', () => {
  const { env } = process;

  return {
    secret: env.JWT_SECRET,
    signOptions: { expiresIn: '5h' },
  };
});
