import { AxiosError, AxiosResponse } from 'axios';

import { ApiResponseOnFailure } from './apiResponse';

export type RawApiResponse = {
  Host: string;
  Codeversion: string;
  Success: boolean;
  SuccessNested: boolean;
  ResourceName: string;
  RequestStartTime: string;
  RequestEndTime: string;
  ServerTimeZone: string;
  NumResults?: number;
  NumResultsNested?: number;
  Results?: unknown;
  Deleted?: unknown;
  Affected?: unknown;
  Error?: number;
  ErrorMessage?: string;
  ErrorInternal?: string;
  ErrorExtended?: unknown;
  _ignoreTypeGuard?: boolean; // workaround until SP-351 is done, we don't want to update every test by hand
};

function isRawApiResponse(response: Record<string, unknown>): response is RawApiResponse {
  if (typeof response.data === 'string') return false;
  const hasHost = 'Host' in response;
  const hasCodeversion = 'Codeversion' in response;
  const hasSuccess = 'Success' in response;
  const hasSuccessNested = 'SuccessNested' in response;
  const hasRequestStartTime = 'RequestStartTime' in response;
  const hasIgnoreTypeGuard = '_ignoreTypeGuard' in response && response._ignoreTypeGuard === true;

  return hasIgnoreTypeGuard || (hasHost && hasCodeversion && hasSuccess && hasSuccessNested && hasRequestStartTime);
}

export async function createRawApiResponse(promise: Promise<AxiosResponse>): Promise<RawApiResponse> {
  // We are trying to match the structure in `toApiResponse` here. RawApiResponse should be removed in the future.
  let axiosResponse: AxiosResponse;

  try {
    axiosResponse = await promise;
  } catch (e) {
    const error = e as AxiosError;
    if (error.response?.data != null && typeof error.response.data !== 'string' && 'Success' in error.response.data) {
      axiosResponse = error.response;
    } else {
      throw {
        _plainError: error,
        message: error.message,
        code: error.response?.status,
        stack: error.stack ?? new Error().stack,
      };
    }
  }

  if (isRawApiResponse(axiosResponse.data) && axiosResponse.data.Success) {
    axiosResponse.data._ignoreTypeGuard = undefined;
    return axiosResponse.data;
  } else {
    const optionalResponse = axiosResponse.data as ApiResponseOnFailure | undefined;

    throw {
      response: optionalResponse,
      _plainError: axiosResponse,
      message: optionalResponse?.ErrorMessage ?? (axiosResponse.status != 200 ? axiosResponse.statusText : 'Something went wrong'),
      code: optionalResponse?.Error ?? axiosResponse.status,
      stack: new Error().stack,
    };
  }
}
