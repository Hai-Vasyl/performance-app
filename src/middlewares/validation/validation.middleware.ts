import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
  schema = Joi.object({});

  use(req: Request, res: Response, next: NextFunction) {
    const { error } = this.schema.validate(req.body);

    if (error && Object.keys(error).length) {
      return res.status(401).json(error);
    }
    next();
  }
}
