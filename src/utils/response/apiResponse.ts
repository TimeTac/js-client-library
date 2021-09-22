import { UserStatusOverview } from '../../userStatusOverview/types';
import { User } from '../../users/types';
import { TimeTracking } from '../../timetrackings/types';
import { TimesheetAccounting } from '../../timesheetAccountings/types';
import { Team } from '../../teams/types';
import { Task } from '../../tasks/types';
import { Project } from '../../projects/types';
import { GeneralSetting } from '../../generalSettings/types';
import { Department } from '../../departments/types';
import { AbsenceType } from '../../absenceTypes/types';
import { Absence } from '../../absences/types';
import { AbsenceDay } from '../../absenceDays/types';
import { TimesheetAccountingSummaries } from '../../timesheetAccountingSummaries/types';

export type Resources = {
  // absenceBans: AbsenceBan;
  absenceDays: AbsenceDay;
  // absenceReplacements: AbsenceReplacement;
  absences: Absence;
  absenceTypes: AbsenceType;
  // changeTimeTrackingRequests: ChangeTimeTrackingRequest;
  // checkpoints: Checkpoint;
  // checkpointTrackings: CheckpointTracking;
  // checkpointTranslations: CheckpointTranslation;
  // clients: Client;
  department: Department;
  deltaSync: undefined;
  generalSettings: GeneralSetting;
  // holidayRequests: HolidayRequest;
  // messages: Message;
  // multiuserToTasks: MultiuserToTask;
  // nfcTransponder: NfcTransponder;
  // nodesToUsers: NodesToUser;
  // notifications: Notification;
  // notificationsTypeHtml: NotificationsTypeHtml;
  // notificationUrls: NotificationUrl;
  // permissionResolveAbsenceTypesAndUsers: PermissionResolveAbsenceTypesAndUser;
  // permissionResolveDepartments: PermissionResolveDepartment;
  // permissionResolveHolidayRequests: PermissionResolveHolidayRequest;
  // permissionResolveQuestions: PermissionResolveQuestion;
  // permissionResolveTeams: PermissionResolveTeam;
  // permissionResolveUsers: PermissionResolveUser;
  // permissions: Permission;
  projects: Project;
  // serverEvents: ServerEvent;
  // serverTime: ServerTime;
  // skills: Skill;
  // surveys: Survey;
  tasks: Task;
  teams: Team;
  // timePlannings: TimePlanning;
  timesheetAccountings: TimesheetAccounting;
  timesheetAccountingSummaries: TimesheetAccountingSummaries;
  // timesheetActionLogs: TimesheetActionLog;
  // timetrackingChangelogs: TimetrackingChangelog;
  timeTrackings: TimeTracking;
  // translations: Translation;
  users: User;
  userStatusOverview: UserStatusOverview;
};

export type ResourceNames = keyof Resources & string;
export type Entity<R extends ResourceNames> = Resources[R];

type DeletedAffected = { [resourceName in ResourceNames]?: Resources[resourceName][] };

export type ApiResponseOnSuccess<ResourceName extends ResourceNames> = {
  Success: true;
  NumResults: number;
  Results: Resources[ResourceName][];
  Deleted?: DeletedAffected;
  Affected?: DeletedAffected;
};

export type ApiResponseOnFailure = {
  Success: false;
  RequestStartTime: string;
  Error?: number;
  ErrorMessage: string;
  ErrorExtended?: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    aErrorTranslationConstants: object;
    // eslint-disable-next-line @typescript-eslint/ban-types
    data: object;
    errorString?: string;
    errorCode?: string;
    errorBaseString?: string;
  };
  ErrorInternal?: string;
};

export type BaseApiResponse<ResourceName extends ResourceNames> = {
  ResourceName: ResourceName;
  RequestStartTime: string;
};

export type ApiResponse<ResourceName extends ResourceNames> = BaseApiResponse<ResourceName> &
  (ApiResponseOnSuccess<ResourceName> | ApiResponseOnFailure);

export type LibraryReturn<Results> = {
  Results: Results;
  Deleted: DeletedAffected;
  Affected: DeletedAffected;
}
