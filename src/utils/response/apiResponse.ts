export type ApiResponseOnSuccess<T> = {
  Success: true;
  NumResults: number;
  Results: T;
  RequestStartTime: string;
};
export type ApiResponseOnFailure = {
  Success: false;
  RequestStartTime: string;
  Error?: number;
  ErrorMessage: string;
  ErrorExtended?: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    aErrorTranslationConstants: object;
    // eslint-disable-next-line @typescript-eslint/ban-types
    data: object;
    errorString?: string;
    errorCode?: string;
    errorBaseString?: string;
  };
  ErrorInternal?: string;
};

export type ApiResponse<T> = ApiResponseOnSuccess<T> | ApiResponseOnFailure;
