import { AxiosError, AxiosResponse } from 'axios';

import { ApiResponse, ApiResponseOnFailure, ApiResponseOnSuccess, ResourceNames } from './apiResponse';
import { createRawApiResponse } from './rawApiResponse';
import { createResourceResponse, ResourceResponse } from './resourceResponse';

export type RequestPromise<ResourceName extends ResourceNames> =
  Promise<AxiosResponse<ApiResponse<ResourceName>>>;

export async function toApiResponse<ResourceName extends ResourceNames>(
  promise: RequestPromise<ResourceName>
): Promise<ApiResponseOnSuccess<ResourceName>> {
  // let resolved: AxiosResponse<ApiResponse<T>> | undefined;
  let resolved: AxiosResponse<ApiResponse<ResourceName>> | undefined;

  try {
    resolved = await promise;
  } catch (e) {
    const error = e as AxiosError;

    if (error.response?.data != null && typeof error.response.data !== 'string' && 'Success' in error.response.data) {
      resolved = error.response;
    } else {
      throw {
        _plainError: error,
        message: error.message,
        code: error.response?.status,
        stack: error.stack ?? new Error().stack,
      };
    }
  }

  const apiResponse: ApiResponseOnSuccess<ResourceName> | ApiResponseOnFailure = resolved.data;

  // Workaround for serverCommunication endpoint returning Success: true despite an error
  // if (apiResponse.Success && apiResponse.Results == null) {
  //   (apiResponse as ApiResponse<T>).Success = false;
  // }

  if (apiResponse.Success) {
    return apiResponse;
  }

  throw {
    response: apiResponse,
    _plainError: resolved,
    message: (apiResponse.ErrorMessage as string | undefined) ?? (resolved.status != 200 ? resolved.statusText : 'Unsuccessful response'),
    code: apiResponse.Error ?? resolved.status,
    stack: new Error().stack,
  };
}

/**
 * @return A promise that resolves to T or rejects if no results
 */
export async function required<ResourceName extends ResourceNames>(promise: RequestPromise<T[]>): Promise<T> {
  const response = await toApiResponse<ResourceName>(promise);

  if (response.NumResults > 0) {
    return response.Results[0];
  } else {
    throw new Error('There are no results.');
  }
}

export async function requiredSingle<ResourceName extends ResourceNames>(promise: RequestPromise<T>): Promise<T> {
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
export async function optional<ResourceName extends ResourceNames>(
  promise: RequestPromise<ResourceName>
): Promise<ApiResponseOnSuccess<ResourceName>>  {
  const response = await toApiResponse<ResourceName>(promise);

  return {
    Success: response.Success,
    Results: response.Results,
    NumResults: response.NumResults,
    Affected: response.Affected ?? {},
    Deleted: response.Deleted ?? {},
  };
}

export async function list<ResourceName extends ResourceNames>(
  promise: RequestPromise<ResourceName>
): Promise<ApiResponseOnSuccess<ResourceName>> {
  const response = await toApiResponse<ResourceName>(promise);

  return {
    Success: response.Success,
    Results: response.Results,
    NumResults: response.NumResults,
    Affected: response.Affected ?? {},
    Deleted: response.Deleted ?? {},
  };
}

export async function toResourceResponse<T>(promise: RequestPromise<T[]>): Promise<ResourceResponse<T>> {
  return createResourceResponse(await createRawApiResponse(promise));
}
