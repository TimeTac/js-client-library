import { AxiosError, AxiosResponse } from 'axios';

import { createError, TimeTacApiError, TimeTacErrorType } from '../errors/index';

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

function handleResponse(axiosResponse: AxiosResponse): RawApiResponse {
  if (isRawApiResponse(axiosResponse.data) && axiosResponse.data.Success) {
    axiosResponse.data._ignoreTypeGuard = undefined;
    return axiosResponse.data;
  }
  throw createError('Request failed with Success false', axiosResponse.config, null, axiosResponse.request, axiosResponse);
}

function handleError(axiosError: AxiosError) {
  const timeTacApiError: TimeTacApiError = {
    errorType: TimeTacErrorType.FailedRequest,
    message: axiosError.message,
    response: axiosError.response as Partial<RawApiResponse>,
    axiosError: axiosError.toJSON() as Record<string, unknown>,
  };

  return Promise.reject(timeTacApiError);
}

function isRawApiResponse(response: Record<string, unknown>): response is RawApiResponse {
  const hasHost = 'Host' in response;
  const hasCodeversion = 'Codeversion' in response;
  const hasSuccess = 'Success' in response;
  const hasSuccessNested = 'SuccessNested' in response;
  const hasRequestStartTime = 'RequestStartTime' in response;
  const hasIgnoreTypeGuard = '_ignoreTypeGuard' in response && response._ignoreTypeGuard === true;

  return hasIgnoreTypeGuard || (hasHost && hasCodeversion && hasSuccess && hasSuccessNested && hasRequestStartTime);
}

export async function createRawApiResponse(promise: Promise<AxiosResponse>): Promise<RawApiResponse> {
  return promise.then(handleResponse).catch(handleError);
}
