import { SetMetadata } from '@nestjs/common';

export const DTO_METADATA = 'dto';

export const ResponseDto = (dto: any) => SetMetadata(DTO_METADATA, dto);
