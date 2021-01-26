import { AxiosResponse } from 'axios';

import { Absence } from '../../absences/types';
import { DeltaSyncResults } from '../../deltaSync/types';
import { Task } from '../../tasks/types';
import { RawApiResponse } from './rawApiResponse';
import { ResourceResponse } from './resourceResponse';

export type DeltaSyncResponse = {
  success: boolean;
  apiResponse: RawApiResponse;
  results: DeltaSyncResults;
};

export function createDeltaSyncResponse(rawApiResponse: RawApiResponse): DeltaSyncResponse {
  const result: DeltaSyncResponse = {
    success: true,
    apiResponse: rawApiResponse,
    results: {
      absences: convert<Absence>(rawApiResponse, 'absences'),
      tasks: convert<Task>(rawApiResponse, 'tasks'),
      timeTrackings: convert(rawApiResponse, 'timeTrackings'),
    },
  };
  return result;
}

function convert<T>(deltaSyncResonse: RawApiResponse, resource: keyof DeltaSyncResults & string): ResourceResponse<T> | undefined {
  const includeResponse: RawApiResponse = deltaSyncResonse.Results[resource];

  if (!includeResponse) {
    return undefined;
  }

  const result: ResourceResponse<T> = {
    success: includeResponse.Success ?? false,
    apiResponse: includeResponse,
    results: includeResponse.Results ?? [],
    deleted: includeResponse.Deleted ?? [],
  };

  return result;
}
