import { AxiosResponse } from 'axios';
import { ApiResponse, ApiResponseOnSuccess } from './apiResponse';

class ResponseHandler {
  async toApiResponse<T>(promise: Promise<AxiosResponse>): Promise<ApiResponseOnSuccess<T>> {
    const dataPromise = await promise;
    const apiResponse = (dataPromise.data as unknown) as ApiResponse<T>;

    if (apiResponse.Success) {
      return apiResponse;
    }

    throw apiResponse;
  }

  /**
   * @return A promise that resolves to T or rejects if no results
   */
  required<T>(promise: Promise<AxiosResponse>): Promise<T> {
    return this.toApiResponse<T[]>(promise).then((response: ApiResponseOnSuccess<T[]>) => {
      if (response.NumResults > 0) {
        return response.Results[0];
      } else {
        throw new Error('There are no results.');
      }
    });
  }

  requiredList<T>(promise: Promise<AxiosResponse>): Promise<T[]> {
    return this.toApiResponse<T[]>(promise).then((response: ApiResponseOnSuccess<T[]>) => {
      if (response.NumResults > 0) {
        return response.Results;
      } else {
        throw new Error('There are no results.');
      }
    });
  }

  /**
   * @return A promise that resolves to T or undefined if no results but Success is true.
   */
  optional<T>(promise: Promise<AxiosResponse>): Promise<T | undefined> {
    return this.toApiResponse<T[]>(promise).then((response: ApiResponseOnSuccess<T[]>) => {
      return (response.NumResults > 0 && response.Results[0]) || undefined;
    });
  }

  /**
   * @return A promise that resolves to array of T or null if no results but Success is true.
   */
  optionalList<T>(promise: Promise<AxiosResponse>): Promise<T[]> {
    return this.toApiResponse<T[]>(promise).then((response: ApiResponseOnSuccess<T[]>) => {
      return (response.NumResults > 0 && response.Results) || [];
    });
  }
}

export default new ResponseHandler();
