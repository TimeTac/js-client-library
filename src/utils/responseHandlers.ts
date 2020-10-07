import { AxiosResponse } from 'axios';
import { ApiResponse } from './apiResponse';

class ResponseHandler {
  private toApiResponse(promise: Promise<any>) {
    return promise.then((response) => {
      if (!response) {
        return Promise.reject(new Error('Request failed.'));
      }
      if (response.status === 200 && response.data.Success) {
        return response.data;
      }
      // response.statusText is never null,
      // rather an empty string is returned on eg. 403 => fallback to status code
      const message = response.statusText || response.status.toString();
      return Promise.reject(new Error(message));
    });
  }

  /**
   * @return A promise that resolves to T or rejects if no results
   */
  required<T>(promise: Promise<AxiosResponse>): Promise<T> {
    return this.toApiResponse(promise).then((response: ApiResponse<T[]>) => {
      if (response.NumResults > 0) {
        return response.Results[0];
      }
      return Promise.reject(new Error(response.ErrorMessage!));
    });
  }

  requiredList<T>(promise: Promise<AxiosResponse>): Promise<T[]> {
    return this.toApiResponse(promise).then((response: ApiResponse<T[]>) => {
      if (response.NumResults > 0) {
        return response.Results;
      }
      return Promise.reject(new Error(response.ErrorMessage != null ? response.ErrorMessage : 'No results'));
    });
  }

  /**
   * @return A promise that resolves to T or null if no results but Success is true.
   */
  optional<T>(promise: Promise<AxiosResponse>): Promise<T | undefined> {
    return this.toApiResponse(promise).then((response: ApiResponse<T[]>) => {
      if (response.Success) {
        return (response.NumResults > 0 && response.Results[0]) || undefined;
      }
      return Promise.reject(response.ErrorMessage);
    });
  }
}

export default new ResponseHandler();
