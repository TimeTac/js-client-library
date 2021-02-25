import { AxiosResponse } from 'axios';

import { ErrorReason, TimeTacApiError } from '../../errors/index';

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
  throw axiosResponse;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleError(error: any) {
  const apiResponseError: TimeTacApiError = {
    reason: ErrorReason.ReponseFailed,
    _plainError: JSON.stringify(error),
    response: undefined,
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (error.data !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    apiResponseError.response = error.data;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (Boolean(error.response) && Boolean(error.response.data)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    apiResponseError.response = error.response.data;
  }

  return Promise.reject(apiResponseError);
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
