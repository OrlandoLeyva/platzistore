import * as Joi from 'joi';
import chalk from 'chalk';

import { HttpException, HttpStatus } from '@nestjs/common';
import { responses } from 'src/utils/response.handler';

export function schemasValidator(
  schema: Joi.ObjectSchema | Joi.ArraySchema,
  value: any,
) {
  const { error } = schema.validate(value);
  if (error) {
    throw new HttpException(
      responses.error(400, error.message),
      HttpStatus.BAD_REQUEST,
    );
  }
}
