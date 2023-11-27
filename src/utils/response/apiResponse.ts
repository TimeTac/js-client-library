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
import { Client } from '../../clients/types';
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
import { Notification } from '../../notifications/types';
import { NotificationTypeHtml } from '../../notificationsTypeHtml/types';
import { NotificationUrl } from '../../notificationUrls/types';
import { Timezone } from '../../timezones/types';
import { AbsenceBan } from '../../absenceBans/types';
import { PermissionResolveUser } from '../../permissions/permissionResolveUsers/types';
import { PermissionResolveDepartment } from '../../permissions/permissionResolveDepartments/types';
import { HealthRule } from '../../health/healthRules/types';
import { HealthData } from '../../health/healthData/types';
import { Country } from '../../countries/types';
import { UserTemplateHistory } from '../../userTemplateHistory/types';
import { Salutation } from '../../salutations/types';
import { PermissionResolveAbsenceTypesAndUser } from '../../permissions/permissionResolveAbsenceTypesAndUsers/types';
import { Feature } from '../../features/types';
import { WorkSchedule } from '../../workSchedules/types';
import { WorkScheduleDay } from '../../workScheduleDays/types';
import { WorkScheduleDayDefinition } from '../../workScheduleDayDefinitions/types';
import { PermissionResolveEntity } from '../../permissions/permissionResolveEntities/types';
import { PublicHolidayTemplates } from '../../publicHolidayTemplates/types';
import { UserRole } from '../../userRoles/types';
import { JobQueue } from '../../jobQueues/types';
import { Language } from '../../languages/types';
import { SsoConfig } from '../../ssoConfig/types';
import { Tier } from '../../tiers/types';
import { MonitoringRulesRead } from '../../monitoringRule/monitoringRules/types';
import { MonitoringRuleFrequencyRead } from '../../monitoringRule/monitoringRuleFrequencies/types';
import { MonitoringRuleIntervalsRead } from '../../monitoringRule/monitoringRuleIntervals/types';
import { MonitoringRuleRecipientsRead } from '../../monitoringRule/monitoringRuleRecipients/types';
import { MonitoringRuleTemplatesRead } from '../../monitoringRule/monitoringRuleTemplates/types';
import { GeofenceRead } from '../../geoFences/types';
import { GeofenceToNodesRead } from '../../geofenceToNodes/types';

// Because types cannot be iterated at runtime, we add the keys of Resources here as a value
// Below we add conditional types that don't compile if this array and Resources go out of sync
export const resourceNameArray = [
  'absenceBans',
  'absenceDays',
  'absences',
  'absenceTypes',
  'changeTimeTrackingRequests',
  'clients',
  'countries',
  'teamMembers',
  'departments',
  'generalSettings',
  'todoTasks',
  'languages',
  'messages',
  'notifications',
  'notificationsTypeHtml',
  'notificationUrls',
  'permissionResolveEntities',
  'permissionResolveUsers',
  'permissionResolveDepartments',
  'permissionResolveAbsenceTypesAndUsers',
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
  'healthRules',
  'healthData',
  'userTemplateHistory',
  'salutations',
  'workSchedules',
  'workScheduleDays',
  'workScheduleDayDefinitions',
  'publicHolidayTemplates',
  'userRoles',
  'jobQueues',
  'ssoConfig',
  'tiers',
  'features',
  'monitoringRules',
  'monitoringRuleFrequencies',
  'monitoringRuleIntervals',
  'monitoringRuleRecipients',
  'monitoringRuleTemplates',
  'geofences',
  'geofenceToNodes',
] as const;

export type Resources = {
  absenceBans: AbsenceBan;
  absenceDays: AbsenceDay;
  // absenceReplacements: AbsenceReplacement;
  absences: Absence;
  absenceTypes: AbsenceType;
  changeTimeTrackingRequests: ChangeTimeTrackingRequest;
  // checkpoints: Checkpoint;
  // checkpointTrackings: CheckpointTracking;
  // checkpointTranslations: CheckpointTranslation;
  clients: Client;
  countries: Country;
  teamMembers: TeamMember;
  departments: Department;
  generalSettings: GeneralSetting;
  todoTasks: TodoTask;
  // holidayRequests: HolidayRequest;
  languages: Language;
  messages: Message;
  // multiuserToTasks: MultiuserToTask;
  // nfcTransponder: NfcTransponder;
  // nodesToUsers: NodesToUser;
  notifications: Notification;
  notificationsTypeHtml: NotificationTypeHtml;
  notificationUrls: NotificationUrl;
  permissionResolveAbsenceTypesAndUsers: PermissionResolveAbsenceTypesAndUser;
  // permissionResolveHolidayRequests: PermissionResolveHolidayRequest;
  // permissionResolveQuestions: PermissionResolveQuestion;
  // permissionResolveTeams: PermissionResolveTeam;
  permissionResolveEntities: PermissionResolveEntity;
  permissionResolveUsers: PermissionResolveUser;
  permissionResolveDepartments: PermissionResolveDepartment;
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
  healthRules: HealthRule;
  healthData: HealthData;
  userTemplateHistory: UserTemplateHistory;
  salutations: Salutation;
  workSchedules: WorkSchedule;
  workScheduleDays: WorkScheduleDay;
  workScheduleDayDefinitions: WorkScheduleDayDefinition;
  publicHolidayTemplates: PublicHolidayTemplates;
  userRoles: UserRole;
  jobQueues: JobQueue;
  ssoConfig: SsoConfig;
  tiers: Tier;
  features: Feature;
  monitoringRules: MonitoringRulesRead;
  monitoringRuleFrequencies: MonitoringRuleFrequencyRead;
  monitoringRuleIntervals: MonitoringRuleIntervalsRead;
  monitoringRuleRecipients: MonitoringRuleRecipientsRead;
  monitoringRuleTemplates: MonitoringRuleTemplatesRead;
  geofences: GeofenceRead;
  geofenceToNodes: GeofenceToNodesRead;
};

// These conditional types ensure that the resourceNameArray and the Resources type are in sync
type NeverIfArrayDoesNotMatchResources = keyof Resources extends (typeof resourceNameArray)[number] ? true : never;
type NeverIfResourcesDoNotMatchArray = (typeof resourceNameArray)[number] extends keyof Resources ? true : never;
// The assignments below fail and prevent compilation if the conditional types are never
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _assertResourcesMatchArray: NeverIfArrayDoesNotMatchResources = true;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _assertArrayMatchesResources: NeverIfResourcesDoNotMatchArray = true;

export type ResourceNames = keyof Resources & (typeof resourceNameArray)[number];
export type Entity<R extends ResourceNames> = Resources[R];

type DeletedEntryInfo = {
  id: string;
  deleted_at: string;
};

export type DeletedData = DeletedEntryInfo[] | { [resourceName in ResourceNames]?: DeletedEntryInfo[] };
type ListOfAllResources = { [resourceName in ResourceNames]?: Resources[resourceName][] };

export type ApiResponseBatchOnSuccess<ResourceName extends ResourceNames> = {
  Success: true;
  NumResults: number;
  Results: ApiResponseOnSuccess<ResourceName>[];
  Deleted?: DeletedData;
  Affected?: ListOfAllResources;
  SuccessBatch: true;
};

export type ApiResponseBatchOnFailure<ResourceName extends ResourceNames> = {
  Success: true;
  NumResults: number;
  Results: (ApiResponseOnSuccess<ResourceName> | ApiResponseOnFailure)[];
  Deleted?: DeletedData;
  Affected?: ListOfAllResources;
  SuccessBatch: false;
};

export type ApiResponseOnSuccessDeltaSync<ResourceName extends ResourceNames> = ApiResponseOnSuccess<ResourceName, ListOfAllResources>;

export type ApiResponseOnFailureServerCommunication = Omit<ApiResponseOnFailure, 'Success'> & {
  Success: true;
  Results: null;
};

export type ApiResponseOnSuccess<ResourceName extends ResourceNames, Results = Resources[ResourceName][]> = {
  Success: true;
  NumResults: number;
  Results: Results;
  Deleted?: DeletedData;
  Affected?: ListOfAllResources;
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
  ErrorMetaData?: {
    [key: string]: string;
  };
};

export type BaseApiResponse<ResourceName extends ResourceNames> = {
  ResourceName: ResourceName;
  RequestStartTime: string;
};

export type ApiResponse<ResourceName extends ResourceNames> = BaseApiResponse<ResourceName> &
  (ApiResponseOnSuccess<ResourceName> | ApiResponseOnFailure);

export type ApiBatchResponse<ResourceName extends ResourceNames> = BaseApiResponse<ResourceName> &
  (ApiResponseBatchOnSuccess<ResourceName> | ApiResponseBatchOnFailure<ResourceName> | ApiResponseOnFailure);

export type LibraryReturn<ResourceName extends ResourceNames, Results = Resources[ResourceName]> = {
  Results: Results;
  Deleted: DeletedData;
  Affected: ListOfAllResources;
};

export type NonEntityResult<T> = {
  Results: T;
};
