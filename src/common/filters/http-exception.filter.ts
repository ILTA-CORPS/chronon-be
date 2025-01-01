import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  UnprocessableEntityException,
  ValidationError,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ErrorResponse } from '../types/error.response.type';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { EntityNotFoundError } from 'typeorm';
import { validationMessage } from '../utils/error-formater.util';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    if (exception instanceof JsonWebTokenError) {
      httpStatus = HttpStatus.UNAUTHORIZED;
      message = 'Invalid token';
    }

    if (exception instanceof TokenExpiredError) {
      httpStatus = HttpStatus.UNAUTHORIZED;
      message = 'Token expired';
    }

    if (exception instanceof EntityNotFoundError) {
      const match = exception.message.match(/entity of type ['"]([^'"]+)['"]/);
      const entityName = match ? match[1] : null;
      message = entityName ? `${entityName} not found` : `Not found`;
      httpStatus = HttpStatus.NOT_FOUND;
    }

    const response: ErrorResponse = {
      success: false,
      statusCode: httpStatus,
      message: message,
    };

    if (exception instanceof UnprocessableEntityException) {
      const errors = exception.cause as ValidationError[];
      response.data = validationMessage(errors);
    }

    console.log(exception);

    httpAdapter.reply(ctx.getResponse(), response, httpStatus);
  }
}
