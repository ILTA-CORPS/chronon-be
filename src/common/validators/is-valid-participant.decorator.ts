import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsValidParticipant(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsValidParticipant',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate: (value: any, args: ValidationArguments) => {
          const quantity = (args.object as any)['quantity'] as number;
          const totalQuantity = value.reduce(
            (sum: number, item: { quantity: number }) => sum + item.quantity,
            0,
          );
          return quantity === totalQuantity;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} quantity must be equal to item quantity`;
        },
      },
    });
  };
}
