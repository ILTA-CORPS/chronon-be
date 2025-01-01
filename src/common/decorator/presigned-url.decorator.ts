import { SetMetadata } from '@nestjs/common';

export const PRESIGNED_URL_METADATA = 'preSignedUrl';

export type PreSignedUrlObject = {
  originalKey: string;
  urlKey: string;
};

export const PreSignedUrl = (message: PreSignedUrlObject[]) =>
  SetMetadata(PRESIGNED_URL_METADATA, message);
