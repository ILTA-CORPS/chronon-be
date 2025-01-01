export type ErrorResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: string | object;
};
