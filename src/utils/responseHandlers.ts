import { AxiosResponse } from 'axios';
import { ApiResponse } from './apiResponse';

class ResponseHandler {
  toApiResponse(promise: Promise<any>) {
    return promise
      .then((response: AxiosResponse) => {
        if (response.data.Success) {
          return response.data;
        }
        return Promise.reject(response);
      })
      .catch((error: any) => {
        if (error.response!.data) {
          return Promise.reject(error.response.data);
        }
        return Promise.reject(error.message);
      });
  }

  /**
   * @return A promise that resolves to T or rejects if no results
   */
  required<T>(promise: Promise<AxiosResponse>): Promise<T> {
    return this.toApiResponse(promise)
      .then((response: ApiResponse<T[]>) => {
        if (response.NumResults > 0) {
          return response.Results[0];
        }
        return Promise.reject(new Error(response.ErrorMessage!));
      })
      .catch((error) => error);
  }

  requiredList<T>(promise: Promise<AxiosResponse>): Promise<T[]> {
    return this.toApiResponse(promise)
      .then((response: ApiResponse<T[]>) => {
        if (response.NumResults >= 0) {
          return response.Results;
        }
        return Promise.reject(new Error(response.ErrorMessage != null ? response.ErrorMessage : 'No results'));
      })
      .catch((error) => error);
  }

  /**
   * @return A promise that resolves to T or null if no results but Success is true.
   */
  optional<T>(promise: Promise<AxiosResponse>): Promise<T | undefined> {
    return this.toApiResponse(promise)
      .then((response: ApiResponse<T[]>) => {
        if (response.Success) {
          return (response.NumResults > 0 && response.Results[0]) || undefined;
        }
        return Promise.reject(response.ErrorMessage);
      })
      .catch((error) => error);
  }
}

export default new ResponseHandler();
