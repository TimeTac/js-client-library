export class ApiResponse<T> {
  Success: boolean;
  NumResults: number;
  Results: T;
  ErrorMessage: string | undefined;
  RequestStartTime: string;

  constructor(Success: boolean, NumResults: number, Results: T, ErrorMessage: string | undefined, RequestStartTime: string) {
    this.Success = Success;
    this.NumResults = NumResults;
    this.Results = Results;
    this.ErrorMessage = ErrorMessage;
    this.RequestStartTime = RequestStartTime;
  }
}
