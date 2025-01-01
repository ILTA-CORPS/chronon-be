import { ValidationError } from '@nestjs/common';

export function validationMessage(validation: ValidationError[]) {
  return validation.map((error) => {
    if (error.children.length > 0) {
      return {
        field: error.property,
        message: validationMessage(error.children),
      };
    } else {
      return {
        field: error.property,
        message: Object.values(error.constraints)[0],
      };
    }
  });
}
