export enum ErrorReason {
  Unknown = 'Unknown Error',
  ResponseFailed = 'Response Failed',
}

export type TimeTacApiError = {
  reason: ErrorReason;
  response?: unknown;
  _plainError?: string;
};

export type TTError = {
  statusCode: number | undefined;
  message: string | undefined;
  raw: unknown;
};
