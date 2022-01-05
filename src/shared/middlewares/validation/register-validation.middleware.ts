import { Injectable } from '@nestjs/common';

import { ValidationMiddleware } from '@/shared/middlewares/validation/validation.middleware';
import * as Joi from 'joi';

@Injectable()
export class RegisterValidationMiddleware extends ValidationMiddleware {
  schema = Joi.object({
    firstname: Joi.string().required().max(30).label('First Name'),
    lastname: Joi.string().required().max(30).label('Last Name'),
    email: Joi.string().required().email().label('Email'),
    password: Joi.string().required().min(4).label('Password'),
    role: Joi.string().label('Role'),
  }).options({ abortEarly: false });
}
