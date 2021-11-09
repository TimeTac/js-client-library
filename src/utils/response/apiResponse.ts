import { UserStatusOverview } from '../../userStatusOverview/types';
import { User, UserReadMe } from '../../users/types';
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
import { ServerCommunication } from '../../serverCommunication/types';
import { Feedback } from '../../feedback/types';
import { ChangeTimeTrackingRequest } from '../../changeTimeTrackingRequests/types';
import { TodoTask } from '../../todoTasks/types';
import { FavouriteTask } from '../../favouriteTasks/types';
import { RecentTask } from '../../recentTasks/types';
import { TeamMember } from '../../teamMembers/types';
import { TimePlanning } from '../../timeplannings/types';
import { Translation } from '../../translations/types';
import { UserDefinedFieldDefinitions } from '../../userDefinedFieldDefinitions/types';
import { UserDefinedFieldDefinitionOptions } from '../../userDefinedFieldDefinitionOptions/types';
import { Message } from '../../messages/types';
import { Timezone } from '../../timezones/types';

// Because types cannot be iterated at runtime, we add the keys of Resources here as a value
// Below we add conditional types that don't compile if this array and Resources go out of sync
export const resourceNameArray = [
  'absenceDays',
  'absences',
  'absenceTypes',
  'changeTimeTrackingRequests',
  'teamMembers',
  'departments',
  'deltaSync',
  'generalSettings',
  'todoTasks',
  'messages',
  'recentTasks',
  'projects',
  'timezones',
  'tasks',
  'teams',
  'serverCommunication',
  'timePlannings',
  'timesheetAccountings',
  'timesheetAccountingSummaries',
  'timeTrackings',
  'translations',
  'favouriteTasks',
  'users',
  'usersReadMe',
  'userStatusOverview',
  'feedback',
  'userDefinedFieldDefinitions',
  'userDefinedFieldDefinitionOptions',
] as const;

export type Resources = {
  // absenceBans: AbsenceBan;
  absenceDays: AbsenceDay;
  // absenceReplacements: AbsenceReplacement;
  absences: Absence;
  absenceTypes: AbsenceType;
  changeTimeTrackingRequests: ChangeTimeTrackingRequest;
  // checkpoints: Checkpoint;
  // checkpointTrackings: CheckpointTracking;
  // checkpointTranslations: CheckpointTranslation;
  // clients: Client;
  teamMembers: TeamMember;
  departments: Department;
  deltaSync: undefined;
  generalSettings: GeneralSetting;
  todoTasks: TodoTask;
  // holidayRequests: HolidayRequest;
  messages: Message;
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
  recentTasks: RecentTask;
  projects: Project;
  timezones: Timezone;
  // serverEvents: ServerEvent;
  // serverTime: ServerTime;
  // skills: Skill;
  // surveys: Survey;
  tasks: Task;
  teams: Team;
  serverCommunication: ServerCommunication;
  timePlannings: TimePlanning;
  timesheetAccountings: TimesheetAccounting;
  timesheetAccountingSummaries: TimesheetAccountingSummaries;
  // timesheetActionLogs: TimesheetActionLog;
  // timetrackingChangelogs: TimetrackingChangelog;
  timeTrackings: TimeTracking;
  translations: Translation;
  favouriteTasks: FavouriteTask;
  users: User;
  usersReadMe: UserReadMe;
  userStatusOverview: UserStatusOverview;
  feedback: Feedback;
  userDefinedFieldDefinitions: UserDefinedFieldDefinitions;
  userDefinedFieldDefinitionOptions: UserDefinedFieldDefinitionOptions;
};

// These conditional types ensure that the resourceNameArray and the Resources type are in sync
type NeverIfArrayDoesNotMatchResources = keyof Resources extends typeof resourceNameArray[number] ? true : never;
type NeverIfResourcesDoNotMatchArray = typeof resourceNameArray[number] extends keyof Resources ? true : never;
// The assignments below fail and prevent compilation if the conditional types are never
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _assertResourcesMatchArray: NeverIfArrayDoesNotMatchResources = true;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _assertArrayMatchesResources: NeverIfResourcesDoNotMatchArray = true;

export type ResourceNames = keyof Resources & typeof resourceNameArray[number];
export type Entity<R extends ResourceNames> = Resources[R];

type DeletedData = {
  id: string;
  deleted_at: string;
};

type ListOfAllResources = { [resourceName in ResourceNames]?: Resources[resourceName][] };

export type ApiResponseOnSuccess<ResourceName extends ResourceNames, Results = Resources[ResourceName][]> = {
  Success: true;
  NumResults: number;
  Results: Results;
  Deleted?: DeletedData[];
  Affected?: ListOfAllResources;
};

export type ApiResponseOnSuccessDeltaSync<ResourceName extends ResourceNames> = ApiResponseOnSuccess<ResourceName, ListOfAllResources>;

export type ApiResponseOnFailureServerCommunication = Omit<ApiResponseOnFailure, 'Success'> & {
  Success: true;
  Results: null;
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

export type LibraryReturn<ResourceName extends ResourceNames, Results = Resources[ResourceName]> = {
  Results: Results;
  Deleted: never[] | DeletedData[];
  Affected: ListOfAllResources;
};
