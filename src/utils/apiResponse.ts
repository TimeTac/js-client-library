export class ApiResponse<T> {
  Success: boolean;
  NumResults: number;
  Results: T;
  ErrorMessage: string | undefined;

  constructor(Success: boolean, NumResults: number, Results: T, ErrorMessage: string | undefined) {
    this.Success = Success;
    this.NumResults = NumResults;
    this.Results = Results;
    this.ErrorMessage = ErrorMessage;
  }
}
