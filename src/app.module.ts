import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import {
  LoginValidationMiddleware,
  RegisterValidationMiddleware,
} from '@/shared/middlewares/validation';
import { UserModule } from '@/modules/users/users.module';
// import { TodoModule } from '@/modules/todos/todo.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { databaseConfig, jwtConfig } from '@/shared/configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [databaseConfig, jwtConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get('database'),
      inject: [ConfigService],
    }),
    UserModule,
    // TodoModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoginValidationMiddleware)
      .forRoutes({ path: 'users/login', method: RequestMethod.POST });
    consumer
      .apply(RegisterValidationMiddleware)
      .forRoutes({ path: 'users/register', method: RequestMethod.POST });
  }
}
