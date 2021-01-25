import { Absence } from '../../absences/types';
import { DeltaSyncResult } from '../../deltaSync/types';
import { TimeTracking } from '../../timetrackings/types';
import { DeltaSyncParams } from '../params/deltaSyncParams';
import { convertToResourceResponse } from './resourceResponse';
import { RequestPromise, toApiResponse } from './responseHandlers';

export type DeltaSyncResponse = {
  success: boolean;
  status?: number;
  results: DeltaSyncResult;
  startTime: string;
  requestParams: DeltaSyncParams; // TODO rename requestParams to something better that works for both
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
    results: {
      // TODO find a better way for this copy and past hell here ... it is hard because we don't now the type
      absences: apiResponse.Results.absences ? convertToResourceResponse<Absence>(apiResponse.Results.absences) : undefined,
      timeTrackings: apiResponse.Results.timeTrackings
        ? convertToResourceResponse<TimeTracking>(apiResponse.Results.timeTrackings)
        : undefined,
    },
    startTime: apiResponse.RequestStartTime,
    requestParams: params,
    // nextPage: TODO paging for deltaSync is not implement yet
  };

  return response;
}
