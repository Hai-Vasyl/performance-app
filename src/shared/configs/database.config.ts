import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => {
  const { env } = process;

  return {
    type: env.DB_TYPE,
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  };
});
