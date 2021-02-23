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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isRawApiResponse(response: any): response is RawApiResponse {
  const hasResponse = Boolean(response);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const hasHost = Boolean(hasResponse && response.host);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const hasCodeversion = Boolean(hasResponse && response.Codeversion);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const hasSuccess = Boolean((hasResponse && response.Success === true) || response.Success === false);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const hasSuccessNested = Boolean((hasResponse && response.SuccessNested === true) || response.SuccessNested === false);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const hasRequestStartTime = Boolean((hasResponse && response.RequestStartTime === true) || response.RequestStartTime === false);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const hasIgnoreTypeGuard = Boolean(hasResponse && response._ignoreTypeGuard);

  return hasIgnoreTypeGuard || (hasHost && hasCodeversion && hasSuccess && hasSuccessNested && hasRequestStartTime);
}

export async function createRawApiResponse(promise: Promise<AxiosResponse>): Promise<RawApiResponse> {
  return promise.then(handleResponse).catch(handleError);
}
