import { AxiosResponse } from 'axios';
import { ApiResponse } from './apiResponse';

export type RequestPromise<T> = Promise<AxiosResponse<ApiResponse<T>>>;

export async function toApiResponse<T>(promise: RequestPromise<T>) {
  const apiResponse = (await promise).data;

  if (apiResponse.Success) {
    return apiResponse;
  }

  throw apiResponse;
}

/**
 * @return A promise that resolves to T or rejects if no results
 */
export async function required<T>(promise: RequestPromise<T[]>): Promise<T> {
  const response = await toApiResponse<T[]>(promise);

  if (response.NumResults > 0) {
    return response.Results[0];
  } else {
    throw new Error('There are no results.');
  }
}

/**
 * @return A promise that resolves to T or undefined if no results but Success is true.
 */
export async function optional<T>(promise: RequestPromise<T[]>): Promise<T | undefined> {
  const response = await toApiResponse<T[]>(promise);
  return (response.NumResults > 0 && response.Results[0]) || undefined;
}

export async function list<T>(promise: RequestPromise<T[]>): Promise<T[]> {
  const response = await toApiResponse<T[]>(promise);
  return response.Results ?? [];
}
