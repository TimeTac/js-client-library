import { AxiosError, AxiosResponse } from 'axios';
import { ServerCommunication } from '../../serverCommunication/types';

import {
  ApiResponse,
  ApiResponseOnFailure,
  ApiResponseOnFailureServerCommunication,
  ApiResponseOnSuccess,
  LibraryReturn,
  ResourceNames,
  Resources,
} from './apiResponse';

export type RequestPromise<ResourceName extends ResourceNames> = Promise<AxiosResponse<ApiResponse<ResourceName>>>;

export type Required<ResourceName extends ResourceNames, Resource = Resources[ResourceName]> = Promise<
  LibraryReturn<ResourceName, Resource>
>;

export async function toApiResponse<ResourceName extends ResourceNames>(
  promise: RequestPromise<ResourceName>
): Promise<ApiResponseOnSuccess<ResourceName>> {
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

  const apiResponse:
    | ApiResponseOnFailureServerCommunication
    | ApiResponseOnSuccess<ResourceName>
    | ApiResponseOnFailure
    | ApiResponseOnSuccess<ResourceName, ServerCommunication> = resolved.data;
  // Workaround for serverCommunication endpoint returning Success: true despite an error
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (apiResponse.Success && apiResponse.Results == null) {
    (apiResponse as ApiResponseOnFailure).Success = false;
  }

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
 * @return A promise that resolves to Type or rejects if no results
 */
export async function required<ResourceName extends ResourceNames>(
  promise: RequestPromise<ResourceName>
): Required<ResourceName, Resources[ResourceName][]> {
  const response = await toApiResponse<ResourceName>(promise);

  if (response.NumResults > 0) {
    return {
      Results: response.Results,
      Affected: response.Affected ?? {},
      Deleted: response.Deleted ?? {},
    };
  } else {
    throw new Error('There are no results.');
  }
}

export async function requiredSingle<ResourceName extends ResourceNames>(
  promise: RequestPromise<ResourceName>
): Promise<LibraryReturn<ResourceName>> {
  const response = await toApiResponse<ResourceName>(promise);

  if (response.NumResults > 0) {
    return {
      Results: response.Results[0],
      Affected: response.Affected ?? {},
      Deleted: response.Deleted ?? {},
    };
  } else {
    throw new Error('There are no results.');
  }
}

export async function serverCommunication<ResourceName extends ResourceNames>(
  promise: RequestPromise<ResourceName>
): Promise<LibraryReturn<ResourceName, ServerCommunication>> {
  const response = (await toApiResponse<ResourceName>(promise)) as unknown as ApiResponseOnSuccess<ResourceName, ServerCommunication>;

  if (response.Results.host) {
    return {
      Results: response.Results,
      Affected: response.Affected ?? {},
      Deleted: response.Deleted ?? {},
    };
  } else {
    throw new Error('There are no results.');
  }
}

/**
 * @return A promise that resolves to Results T or undefined if no results but Success is true.
 */
export async function optional<ResourceName extends ResourceNames>(
  promise: RequestPromise<ResourceName>
): Promise<LibraryReturn<ResourceName, Resources[ResourceName] | undefined>> {
  const response = await toApiResponse<ResourceName>(promise);

  return {
    Results: response.Results[0] ?? undefined,
    Affected: response.Affected ?? {},
    Deleted: response.Deleted ?? {},
  };
}

export async function list<ResourceName extends ResourceNames>(
  promise: RequestPromise<ResourceName>
): Promise<LibraryReturn<ResourceName, Resources[ResourceName][]>> {
  const response = await toApiResponse<ResourceName>(promise);

  return {
    Results: response.Results,
    Affected: response.Affected ?? {},
    Deleted: response.Deleted ?? {},
  };
}
