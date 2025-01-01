// isDefined is (yet) a special case
import {
  buildMessage,
  ValidateBy,
  ValidationOptions,
  ValidationTypes,
} from 'class-validator';

export const IS_DEFINED = ValidationTypes.IS_DEFINED;
/**
 * Checks if value is defined (!== undefined).
 */
export function isPresent<T>(value: T | undefined | null): value is T {
  return value !== undefined;
}
/**
 * Checks if value is defined (!== undefined).
 */
export function IsPresent(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_DEFINED,
      validator: {
        validate: (value): boolean => isPresent(value),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + '$property should be present',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
