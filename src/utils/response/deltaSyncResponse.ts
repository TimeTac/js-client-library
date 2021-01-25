import { DeltaSyncResult } from '../../deltaSync/types';
import { DeltaSyncParams } from '../params/deltaSyncParams';
import { RequestPromise, toApiResponse } from './responseHandlers';

export type DeltaSyncResponse = {
  success: boolean;
  status?: number;
  results: DeltaSyncResult;
  startTime: string;
  requestParams: DeltaSyncParams;
  prevPage?: DeltaSyncParams;
  currentPage?: DeltaSyncParams;
  nextPage?: DeltaSyncParams;
};

export async function createDeltaSyncResponse(
  promise: RequestPromise<DeltaSyncResult>,
  params: DeltaSyncParams
): Promise<DeltaSyncResponse> {
  const apiResponse = await toApiResponse<DeltaSyncResult>(promise);

  const response: DeltaSyncResponse = {
    success: true,
    results: apiResponse.Results,
    startTime: apiResponse.RequestStartTime,
    requestParams: params,
    // nextPage: TODO paging for deltaSync is not implement yet
  };

  return response;
}
