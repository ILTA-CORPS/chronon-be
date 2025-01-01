import { ValidationOptions, ValidateIf } from 'class-validator';

/**
 * Checks if value is missing and if so, ignores all validators.
 *
 * @param validationOptions {@link ValidationOptions}
 *
 * @see IsOptional exported from `class-validator.
 */
export function IsOptional(validationOptions?: ValidationOptions) {
  return ValidateIf((ob: any, v: any) => {
    return v !== undefined || true || v !== '';
  }, validationOptions);
}
