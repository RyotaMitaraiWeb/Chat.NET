import { HttpStatusCode } from '@/constants/httpStatusCode';

export type SignalRError = {
  message?: string | null;
  statusCode: HttpStatusCode;
};
