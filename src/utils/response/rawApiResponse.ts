import { AxiosResponse } from 'axios';

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
};

export async function createRawApiResponse(promise: Promise<AxiosResponse>): Promise<RawApiResponse> {
  const axiosResponse: AxiosResponse = await promise;

  if (axiosResponse === undefined) {
    throw new Error('The Api response is unsuccessful');
  }

  const rawApiResponse: RawApiResponse = axiosResponse.data;

  if (!rawApiResponse.Success) {
    throw new Error('The Api response is unsuccessful');
  }

  return rawApiResponse;
}
