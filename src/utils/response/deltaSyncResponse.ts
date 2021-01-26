import { AxiosResponse } from 'axios';

import { AbsenceDay } from '../../absenceDays/types';
import { Absence } from '../../absences/types';
import { AbsenceType } from '../../absenceTypes/types';
import { DeltaSyncResults } from '../../deltaSync/types';
import { Department } from '../../departments/types';
import { GeneralSetting } from '../../generalSettings/types';
import { Project } from '../../projects/types';
import { Task } from '../../tasks/types';
import { Team } from '../../teams/types';
import { TimesheetAccounting } from '../../timesheetAccountings/types';
import { TimeTracking } from '../../timetrackings/types';
import { User } from '../../users/types';
import { UserStatusOverview } from '../../userStatusOverview/types';
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
      absenceDays: convert<AbsenceDay>(rawApiResponse, 'absenceDays'),
      absences: convert<Absence>(rawApiResponse, 'absences'),
      absenceTypes: convert<AbsenceType>(rawApiResponse, 'absenceTypes'),
      department: convert<Department>(rawApiResponse, 'absenceTypes'),
      generalSettings: convert<GeneralSetting>(rawApiResponse, 'generalSettings'),
      projects: convert<Project>(rawApiResponse, 'projects'),
      tasks: convert<Task>(rawApiResponse, 'tasks'),
      teams: convert<Team>(rawApiResponse, 'teams'),
      timesheetAccountings: convert<TimesheetAccounting>(rawApiResponse, 'timesheetAccountings'),
      timeTrackings: convert<TimeTracking>(rawApiResponse, 'timeTrackings'),
      users: convert<User>(rawApiResponse, 'users'),
      userStatusOverview: convert<UserStatusOverview>(rawApiResponse, 'userStatusOverview'),
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
