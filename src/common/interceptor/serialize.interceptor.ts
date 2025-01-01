import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';
import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse } from '../utils/ApiResponse';
import { Pagination } from 'nestjs-typeorm-paginate';

export function Serialize(dto: any) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((apiResponse: ApiResponse<any>) => {
        if (apiResponse.data instanceof Pagination) {
          apiResponse.meta = {
            ...apiResponse.meta,
            pagination: apiResponse.data.meta,
          };
          apiResponse.data = plainToInstance(this.dto, apiResponse.data.items, {
            excludeExtraneousValues: true,
          });
          return apiResponse;
        }
        apiResponse.data = plainToInstance(this.dto, apiResponse.data, {
          excludeExtraneousValues: true,
        });

        return apiResponse;
      }),
    );
  }
}
