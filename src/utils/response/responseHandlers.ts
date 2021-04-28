import { AxiosResponse } from 'axios';

import { ApiResponse, ApiResponseOnSuccess } from './apiResponse';
import { createRawApiResponse } from './rawApiResponse';
import { createResourceResponse, ResourceResponse } from './resourceResponse';

export type RequestPromise<T> = Promise<AxiosResponse<ApiResponse<T>>>;

export async function toApiResponse<T>(promise: RequestPromise<T>): Promise<ApiResponseOnSuccess<T>> {
  let resolved: AxiosResponse<ApiResponse<T>> | undefined;
  try {
    resolved = await promise;
  } catch (e) {
    const error = e as Error;

    throw {
      response: resolved?.data,
      _plainError: error,
      message: error.message,
      code: resolved?.status,
      stack: error.stack ?? new Error().stack,
    };
  }

  const apiResponse = resolved.data;

  // Workaround for serverCommunication endpoint returning Success: true despite an error
  if (apiResponse.Success && apiResponse.Results == null) {
    (apiResponse as ApiResponse<T>).Success = false;
  }

  if (apiResponse.Success) {
    return apiResponse;
  }

  throw {
    response: apiResponse,
    _plainError: resolved,
    message: apiResponse.ErrorMessage,
    code: apiResponse.Error,
    stack: new Error().stack,
  };
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

export async function requiredSingle<T>(promise: RequestPromise<T>): Promise<T> {
  const response = await toApiResponse<T>(promise);

  if (response.NumResults > 0) {
    return response.Results;
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
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return response.Results ?? [];
}

export async function toResourceResponse<T>(promise: RequestPromise<T[]>): Promise<ResourceResponse<T>> {
  return createResourceResponse(await createRawApiResponse(promise));
}
