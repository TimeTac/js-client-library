export enum ErrorReason {
  Unkown = 'Unknow Error',
  ReponseFailed = 'Response Failed',
}

export type TimeTacApiError = {
  reason: ErrorReason;
  response?: unknown;
  _plainError?: string;
};
