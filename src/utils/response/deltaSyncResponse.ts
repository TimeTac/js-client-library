import { AbsenceDay } from '../../absenceDays/types';
import { Absence } from '../../absences/types';
import { AbsenceType } from '../../absenceTypes/types';
import { DeltaSyncResults } from '../../deltaSync/types';
import { Department } from '../../departments/types';
import { FavouriteTask } from '../../favouriteTasks/types';
import { GeneralSetting } from '../../generalSettings/types';
import { Project } from '../../projects/types';
import { RecentTask } from '../../recentTasks/types';
import { Task } from '../../tasks/types';
import { Team } from '../../teams/types';
import { TimesheetAccounting } from '../../timesheetAccountings/types';
import { TimeTracking } from '../../timetrackings/types';
import { TodoTask } from '../../todoTasks/types';
import { User } from '../../users/types';
import { UserStatusOverview } from '../../userStatusOverview/types';
import { ChangeTimeTrackingRequest } from '../../changeTimeTrackingRequests/types';
import { RawApiResponse } from './rawApiResponse';
import { ResourceResponse } from './resourceResponse';

export type DeltaSyncResponse = {
  success: boolean;
  apiResponse: RawApiResponse;
  results: DeltaSyncResults;
};

export function createDeltaSyncResponse(rawApiResponse: RawApiResponse): DeltaSyncResponse {
  return {
    success: true,
    apiResponse: rawApiResponse,
    results: {
      absenceDays: convert<AbsenceDay>(rawApiResponse, 'absenceDays'),
      absences: convert<Absence>(rawApiResponse, 'absences'),
      absenceTypes: convert<AbsenceType>(rawApiResponse, 'absenceTypes'),
      changeTimeTrackingRequests: convert<ChangeTimeTrackingRequest>(rawApiResponse, 'changeTimeTrackingRequests'),
      departments: convert<Department>(rawApiResponse, 'departments'),
      favouriteTasks: convert<FavouriteTask>(rawApiResponse, 'favouriteTasks'),
      generalSettings: convert<GeneralSetting>(rawApiResponse, 'generalSettings'),
      projects: convert<Project>(rawApiResponse, 'projects'),
      recentTasks: convert<RecentTask>(rawApiResponse, 'recentTasks'),
      tasks: convert<Task>(rawApiResponse, 'tasks'),
      teams: convert<Team>(rawApiResponse, 'teams'),
      timesheetAccountings: convert<TimesheetAccounting>(rawApiResponse, 'timesheetAccountings'),
      timeTrackings: convert<TimeTracking>(rawApiResponse, 'timeTrackings'),
      todoTasks: convert<TodoTask>(rawApiResponse, 'todoTasks'),
      users: convert<User>(rawApiResponse, 'users'),
      userStatusOverview: convert<UserStatusOverview>(rawApiResponse, 'userStatusOverview'),
    },
  };
}

function convert<T>(deltaSyncResonse: RawApiResponse, resource: keyof DeltaSyncResults): ResourceResponse<T> | undefined {
  // @ts-expect-error unknown type used

  const includeResponse: RawApiResponse = deltaSyncResonse.Results[resource];

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition,@typescript-eslint/strict-boolean-expressions
  if (!includeResponse) {
    return undefined;
  }

  return {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    success: includeResponse.Success ?? false,
    apiResponse: includeResponse,
    // @ts-expect-error unknown type used
    results: includeResponse.Results ?? [],
    // @ts-expect-error unknown type used
    deleted: includeResponse.Deleted ?? [],
    affected: {},
  };
}
