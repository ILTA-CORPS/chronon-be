import {
  UnprocessableEntityException,
  ValidationError,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';

export function customValidationPipe(options?: ValidationPipeOptions) {
  return new ValidationPipe({
    transform: true,
    disableErrorMessages: false,
    errorHttpStatusCode: 422,
    stopAtFirstError: true,
    exceptionFactory: (errors: ValidationError[]) => {
      return new UnprocessableEntityException(
        'Something went wrong. Please check your input and try again.',
        {
          cause: errors,
        },
      );
    },
    ...options,
  });
}
