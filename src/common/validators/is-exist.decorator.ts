import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsExist implements ValidatorConstraintInterface {
  constructor(private readonly dataSource: DataSource) {}

  async validate(value: any, validationArguments?: ValidationArguments) {
    const [entity, propertyName] = validationArguments.constraints;
    const repository = this.dataSource.getRepository(entity);

    const record = await repository.findOneBy({ [propertyName]: value });
    return !!record;
  }

  defaultMessage(args: ValidationArguments): string {
    const [EntityClass, property] = args.constraints;
    return `${property} with value ${args.value} is not exists in ${EntityClass.name}.`;
  }
}
