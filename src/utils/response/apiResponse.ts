import { DeletedEntry } from './resourceResponse';

export type ApiResponseOnSuccess<T> = {
  Success: true;
  NumResults: number;
  Results: T;
  Deleted?: DeletedEntry[];
  RequestStartTime: string;
};

export type ApiResponseOnFailure = {
  Success: false;
  RequestStartTime: string;
  ErrorMessage: string;
  ErrorExtended?: {
    aErrorTranslationConstants: object;
    data: object;
    errorString?: string;
    errorCode?: string;
    errorBaseString?: string;
  };
  ErrorInternal?: string;
};

export type ApiResponse<T> = ApiResponseOnSuccess<T> | ApiResponseOnFailure;
