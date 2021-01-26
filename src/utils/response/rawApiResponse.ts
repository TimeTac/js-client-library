import { AxiosResponse } from 'axios';

export type RawApiResponse = {
  Host?: string;
  Codeversion?: string;
  Success?: boolean;
  SuccessNested?: boolean;
  NumResults?: number;
  NumResultsNested?: number;
  ResourceName?: string;
  RequestStartTime?: string;
  RequestEndTime?: string;
  ServerTimeZone?: string;
  Results?: any;
  Deleted?: any;
  Affected?: any;
};

export async function resolveAxiosResponse(promise: Promise<AxiosResponse<any>>): Promise<RawApiResponse> {
  const resolved = await promise;

  if (resolved === undefined) {
    throw new Error('General Error');
  }

  const rawApiResponse: RawApiResponse = (await promise).data;

  if (rawApiResponse.Success == false) {
    throw new Error('General Error');
  }

  return rawApiResponse;
}
