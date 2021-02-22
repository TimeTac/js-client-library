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
  Results?: any;
  Deleted?: any;
  Affected?: any;
  Error?: number;
  ErrorMessage?: string;
  ErrorInternal?: string;
  ErrorExtended?: any;
  _ignoreTypeGuard?: boolean; // workaround until SP-351 is done, we don't want to update every test by hand
};

function handleResponse(axiosResponse: AxiosResponse<any>): RawApiResponse {
  if (axiosResponse && isRawApiResponse(axiosResponse.data) && axiosResponse.data.Success) {
    axiosResponse.data._ignoreTypeGuard = undefined;
    return axiosResponse.data as RawApiResponse;
  }
  throw axiosResponse;
}

function handleError(error: any) {
  let apiResponseError: TimeTacApiError = {
    reason: ErrorReason.ReponseFailed,
    _plainError: JSON.stringify(error),
  };

  if (error.data) {
    apiResponseError.response = error.data;
  }
  if (error.response && error.response.data) {
    apiResponseError.response = error.response.data;
  }
  return Promise.reject(apiResponseError);
}

function isRawApiResponse(response: any): response is RawApiResponse {
  const hasHost = response && response.host;
  const hasCodeversion = response && response.Codeversion;
  const hasSuccess = (response && response.Success === true) || response.Success === false;
  const hasSuccessNested = (response && response.SuccessNested === true) || response.SuccessNested === false;
  const hasRequestStartTime = (response && response.RequestStartTime === true) || response.RequestStartTime === false;

  return response._ignoreTypeGuard || (hasHost && hasCodeversion && hasSuccess && hasSuccessNested && hasRequestStartTime);
}

export async function createRawApiResponse(promise: Promise<AxiosResponse<any>>): Promise<RawApiResponse> {
  return promise.then(handleResponse).catch(handleError);
}
