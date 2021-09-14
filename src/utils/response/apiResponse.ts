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
  deltaSync: undefined,
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
  // timesheetAccountingSummaries: TimesheetAccountingSummary;
  // timesheetActionLogs: TimesheetActionLog;
  // timetrackingChangelogs: TimetrackingChangelog;
  timeTrackings: TimeTracking;
  // translations: Translation;
  users: User;
  userStatusOverview: UserStatusOverview;
};



export type Resource = keyof Resources & string;
export type Entity<R extends Resource> = Resources[R];

export type ApiResponseOnSuccess<R extends Resource, Results = Resources[R], Deleted = Results, Affected = Deleted> = {
  Success: true;
  NumResults: number;
  Results: Results[];
  Deleted: Record<string, Deleted>,
  Affected: Record<string, Affected>,
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

export type BaseApiResponse<R extends Resource> = {
  ResourceName: R,
  RequestStartTime: string;
}

export type ApiResponse<R extends Resource, Results = Resources[R][], Deleted = Results, Affected = Deleted> = BaseApiResponse<R> & (ApiResponseOnSuccess<R, Results, Deleted, Affected> | ApiResponseOnFailure);

export type DeltaSyncResponse = ApiResponse<'deltaSync', {[r in Resource]: ApiResponse<r>}, undefined, undefined>;

const test: DeltaSyncResponse = {Success: true, Results: {'timeTrackings': {Success: true, Results: []}}}
