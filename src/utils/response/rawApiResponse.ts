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
  Results?: unknown;
  Deleted?: unknown;
  Affected?: unknown;
  Error?: number;
  ErrorMessage?: string;
  ErrorInternal?: string;
  ErrorExtended?: unknown;
};

export async function createRawApiResponse(promise: Promise<AxiosResponse>): Promise<RawApiResponse> {
  const axiosResponse: AxiosResponse = await promise;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (axiosResponse === undefined) {
    throw new Error('The Api response is unsuccessful');
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const rawApiResponse: RawApiResponse = axiosResponse.data;

  if (!rawApiResponse.Success) {
    throw new Error('The Api response is unsuccessful');
  }

  return rawApiResponse;
}
