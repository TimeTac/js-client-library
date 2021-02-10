type Base = {
  Host: string;
  Codeversion: string;
  SuccessNested: boolean;
  ResourceName: string;
  RequestStartTime: string;
  RequestEndTime: string;
  ServerTimeZone: string;
};

export type ApiResponseOnSuccess<R, A = unknown> = Base & {
  Success: true;
  NumResults: number;
  NumResultsNested: number;
  Results: R;
  Deleted?: { id: string; deleted_at: string }[];
  Affected?: Record<string, A>;
  RequestStartTime: string;
};

export type ApiResponseOnFailure = Base & {
  Success: false;
  Error: number;
  ErrorMessage: string;
  ErrorExtended?: {
    aErrorTranslationConstants: Record<string, string>;
    data?: { entityType: string; entityKey: string };
    errorString?: string;
    errorCode?: string;
    errorBaseString?: string;
  };
  ErrorInternal?: string;
};

export type ApiResponse<R, A = unknown> = ApiResponseOnSuccess<R, A> | ApiResponseOnFailure;
