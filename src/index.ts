import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AbsenceBansEndpoint } from './absenceBans';
import { AbsenceDaysEndpoint } from './absenceDays';
import { AbsenceTypesEndpoint } from './absenceTypes';
import { AbsencesEndpoint } from './absences';
import { AuthenticationEndpoint } from './authentication';
import { ApiConfig, ApiState, DEFAULT_API_VERSION } from './baseApi';
import { ChangeTimeTrackingRequestEndpoint } from './changeTimeTrackingRequests';
import { ClientsEndpoint } from './clients';
import { CountriesEndpoint } from './countries';
import { DeltaSyncEndpoint } from './deltaSync';
import { DepartmentsEndpoint } from './departments';
import { FavouriteTasksEndpoint } from './favouriteTasks';
import { FeedbackEndpoint } from './feedback';
import { GeneralSettingsEndpoint } from './generalSettings';
import { JobQueuesEndpoint } from './jobQueues';
import { MessagesEndpoint } from './messages';
import { NotificationsEndpoint } from './notifications';
import { NotificationsTypeHtmlEndpoint } from './notificationsTypeHtml';
import { NotificationUrlsEndpoint } from './notificationUrls';
import { PermissionResolveAbsenceTypesAndUsersEndpoint } from './permissions/permissionResolveAbsenceTypesAndUsers/index';
import { PermissionResolveDepartmentsEndpoint } from './permissions/permissionResolveDepartments';
import { PermissionResolveEntitiesEndpoint } from './permissions/permissionResolveEntities';
import { PermissionResolveUsersEndpoint } from './permissions/permissionResolveUsers';
import { ProjectsEndpoint } from './projects';
import { PublicHolidayTemplatesEndpoint } from './publicHolidayTemplates';
import { RecentTasksEndpoint } from './recentTasks';
import { SalutationsEndpoint } from './salutations';
import { ServerCommunicationEndpoint } from './serverCommunication';
import { TasksEndpoint } from './tasks';
import { TeamMembersEndpoint } from './teamMembers';
import { TeamsEndpoint } from './teams';
import { TimePlanningsEndpoint } from './timeplannings';
import { TimesheetAccountingSummariesEndpoint } from './timesheetAccountingSummaries';
import { TimesheetAccountingsEndpoint } from './timesheetAccountings';
import { TimeTrackingsEndpoint } from './timetrackings';
import { TimezonesEndpoint } from './timezones';
import { TodoTasksEndpoint } from './todoTasks';
import { TranslationsEndpoint } from './translations';
import { UserDefinedFieldDefinitionOptionsEndpoint } from './userDefinedFieldDefinitionOptions';
import { UserDefinedFieldDefinitionsEndpoint } from './userDefinedFieldDefinitions';
import { UserRolesEndpoint } from './userRoles';
import { UserStatusOverviewEndpoint } from './userStatusOverview';
import { UserTemplateHistoryEndpoint } from './userTemplateHistory';
import { UsersEndpoint } from './users';
import { ConfigProvider } from './utils';
import { setAxiosDefaults, useInterceptors } from './utils/axiosSetup';
import { WorkScheduleDayDefinitionsEndpoint } from './workScheduleDayDefinitions';
import { WorkScheduleDaysEndpoint } from './workScheduleDays';
import { WorkSchedulesEndpoint } from './workSchedules';
import { LanguagesEndpoint } from './languages';
import { SsoConfigEndpoint } from './ssoConfig';
import { TiersEndpoint } from './tiers';
import { OnboardingStepsEndpoint } from './onboardingSteps';
import { OnboardingStepToUserSEndpoint } from './onboardingStepToUsers';
import { FeaturesEndpoint } from './features';
import { MonitoringRulesEndpoint } from './monitoringRule/monitoringRules';
import { MonitoringRuleTemplatesEndpoint } from './monitoringRule/monitoringRuleTemplates';
import { MonitoringRuleRecipientsEndpoint } from './monitoringRule/monitoringRuleRecipients';
import { MonitoringRuleIntervalsEndpoint } from './monitoringRule/monitoringRuleIntervals';
import { MonitoringRuleFrequenciesEndpoint } from './monitoringRule/monitoringRuleFrequencies';
import { GeofenceEndpoint } from './geoFences';
import { GeofenceToNodesEndpoint } from './geofenceToNodes';
import { AutomaticBreakTemplatesEndpoint } from './automaticBreakTemplates';
import { LegalDocumentsEndpoint } from './legalDocuments';
import { FilesEndpoint } from './files';
import { LegalDocumentAcceptanceLogEndpoint } from './legalDocumentAcceptanceLogs';
import { IntegrationCategoriesEndpoint } from './integrationCategories';
import { IntegrationsEndpoint } from './integrations';
import { IntegrationsToCategoriesEndpoint } from './integrationsToCategories';
import { PublicHolidaysEndpoint } from './publicHolidays';
import { TimesheetActionLogsEndpoint } from './timesheetActionLogs';
import { HolidayAdjustmentEndpoint } from './holidayAdjustment';
import { HourTypesEndpoint } from './hourTypes';
import { FetchDataEndpoint } from './fetchData';
import { UserEventsEndpoint } from './userEvents';
import { WorkingTimeBalanceRulesEndpoint } from './workingTimeBalanceRules';
import { WorkingTimeCyclesEndpoint } from './workingTimeCycles';
import { TimeTrackingChangelogsEndPoint } from './timeTrackingChangelogs';
import { UserPreferencesEndpoint } from './userPreferences';
import { CalculationStatesEndpoint } from './calculationStates';
import { PaidBreaksHistoryEndpoint } from './paidBreaksHistory';
import { OtherPaidLeaveLimitationsEndpoint } from './otherPaidLeaveLimitations';
import { UserHistoryEndpoint } from './userHistory';

export { AbsenceBan } from './absenceBans/types';
export { AbsenceDay } from './absenceDays/types';
export { AbsenceType, AbsenceTypeCreate, AbsenceTypeUpdate } from './absenceTypes/types';
export { Absence, AbsenceApprove, AbsenceCreate, AbsenceReject, AbsenceUpdate } from './absences/types';
export { AutomaticBreakTemplate } from './automaticBreakTemplates/types';
export { Credentials } from './authentication/types';
export { ApiConfig, default as BaseApi, Tokens } from './baseApi';
export { ChangeTimeTrackingRequest } from './changeTimeTrackingRequests/types';
export { Client } from './clients/types';
export { Country } from './countries/types';
export { DeltaSyncResults } from './deltaSync/types';
export { Department, DepartmentCreate, DepartmentUpdate } from './departments/types';
export * from './enums';
export { ErrorFormat } from './errors';
export { FavouriteTask, FavouriteTaskCreate } from './favouriteTasks/types';
export { Feedback } from './feedback/types';
export { GeneralSetting, GeneralSettingUpdate } from './generalSettings/types';
export { JobQueue, JobQueueCreate, JobQueueParam } from './jobQueues/types';
export { Language } from './languages/types';
export { LegalDocumentAcceptanceLog, LegalDocumentAcceptanceLogCreate } from './legalDocumentAcceptanceLogs/types';
export { LegalDocument } from './legalDocuments/types';
export { File } from './files/types';
export { Message, MessageCreate } from './messages/types';
export { NotificationUpdate, Notification } from './notifications/types';
export { NotificationTypeHtml } from './notificationsTypeHtml/types';
export { NotificationUrl } from './notificationUrls/types';
export { PermissionResolveAbsenceTypesAndUser } from './permissions/permissionResolveAbsenceTypesAndUsers/types';
export { PermissionResolveDepartment } from './permissions/permissionResolveDepartments/types';
export { PermissionResolveEntity } from './permissions/permissionResolveEntities/types';
export { PermissionResolveUser } from './permissions/permissionResolveUsers/types';
export { Project } from './projects/types';
export { PublicHolidayTemplates, PublicHolidayTemplatesUpdate, PublicHolidayTemplatesCreate } from './publicHolidayTemplates/types';
export { RecentTask } from './recentTasks/types';
export { Salutation } from './salutations/types';
export { ServerCommunication } from './serverCommunication/types';
export { Task, TaskCreate, TaskUpdate } from './tasks/types';
export { TeamMember } from './teamMembers/types';
export { Team } from './teams/types';
export { TimePlanning } from './timeplannings/types';
export { Integration } from './integrations/types';
export { IntegrationCategory } from './integrationCategories/types';
export { IntegrationToCategory } from './integrationsToCategories/types';
export {
  OtherPaidLeaveLimitationCreate,
  OtherPaidLeaveLimitationUpdate,
  OtherPaidLeaveLimitation,
} from './otherPaidLeaveLimitations/types';
export { TimesheetAccountingSummaries, TimesheetAccountingSummariesRead } from './timesheetAccountingSummaries/types';
export { TimesheetAccounting, TimesheetAccountingApproveRequest, TimesheetAccountingUpdate } from './timesheetAccountings/types';
export {
  StartTimeTrackingData,
  StopTimeTrackingData,
  TimeTracking,
  TimeTrackingCreate,
  TimeTrackingInsert,
  TimeTrackingUpdate,
  TimeTrackingApprove,
  TimeTrackingReject,
  TimeTrackingSplit,
  ToggleTimeTrackingData,
} from './timetrackings/types';
export { Timezone } from './timezones/types';
export { TodoTask, TodoTaskCreate } from './todoTasks/types';
export { Translation } from './translations/types';
export { UserDefinedFieldDefinitionOptions } from './userDefinedFieldDefinitionOptions/types';
export { UserDefinedFieldDefinitions, UserDefinedFieldDefinitionsIds } from './userDefinedFieldDefinitions/types';
export { UserRoleSet } from './userRoles/types';
export { UserStatusOverview } from './userStatusOverview/types';
export { UserTemplateHistory, UserTemplateHistoryView } from './userTemplateHistory/types';
export {
  User,
  UserCreate,
  UserRead,
  UserReadFull,
  UserReadMe,
  UserReadObscured,
  UserResetPassword,
  UserUpdate,
  UserUpdatePassword,
  UserInvite,
} from './users/types';
export { UserHistoryEntry } from './userHistory/types';
export { testAxiosObject } from './utils/axiosSetup';
export { Pages } from './utils/pages/pages';
export { DeltaSyncParams } from './utils/params/deltaSyncParams';
export { RequestParams, RequestParamsBuilder, DEFAULT_PAGE_SIZE } from './utils/params/requestParams';
export {
  ApiResponse,
  ApiResponseOnFailure,
  ApiResponseOnSuccess,
  Entity,
  LibraryReturn,
  ResourceNames,
  Resources,
  resourceNameArray,
} from './utils/response/apiResponse';
export { GeofenceRead, GeofenceCreate, GeofenceUpdate } from './geoFences/types';
export { GeofenceToNodesRead, GeofenceToNodesCreate, GeofenceToNodesUpdate, GeofenceToNodes } from './geofenceToNodes/types';
export { DeltaSyncResponse } from './utils/response/deltaSyncResponse';
export { RawApiResponse } from './utils/response/rawApiResponse';
export { ReadRawResponse } from './utils/response/readRawResponse';
export { DeletedEntry, ResourceResponse } from './utils/response/resourceResponse';
export { plainObject, requiredSingle, list, optional } from './utils/response/responseHandlers';
export { UpdateRawResponse } from './utils/response/updateRawResponse';
export {
  WorkScheduleDayDefinition,
  WorkScheduleDayDefinitionCreate,
  WorkScheduleDayDefinitionUpdate,
} from './workScheduleDayDefinitions/types';
export { WorkScheduleDay, WorkScheduleDayUpdate } from './workScheduleDays/types';
export { WorkSchedule, WorkScheduleCreate, WorkScheduleUpdate } from './workSchedules/types';
export { Tier } from './tiers/types';
export { OnboardingStep } from './onboardingSteps/types';
export { OnboardingStepToUserUpdate, OnboardingStepToUser } from './onboardingStepToUsers/types';
export { Feature } from './features/types';
export {
  MonitoringRulesFrequency,
  MonitoringRulesRead,
  MonitoringRulesUpdate,
  MonitoringRulesCreate,
  MonitoringRuleNotificationOption,
} from './monitoringRule/monitoringRules/types';
export { MonitoringRuleTemplatesRead } from './monitoringRule/monitoringRuleTemplates/types';
export { MonitoringRuleRecipientsRead } from './monitoringRule/monitoringRuleRecipients/types';
export { MonitoringRuleIntervalsRead } from './monitoringRule/monitoringRuleIntervals/types';
export { MonitoringRuleFrequencyRead } from './monitoringRule/monitoringRuleFrequencies/types';
export { DeletedData } from './utils/response/apiResponse';
export { SsoConfig, SsoConfigUpdate, SsoConfigCreate } from './ssoConfig/types';
export { UserPreferenceRead, UserPreferenceName, UserPreferenceSet, UserPreferenceUpdate } from './userPreferences/types';
export { PublicHolidays, PublicHolidaysCreate, PublicHolidaysUpdate } from './publicHolidays/types';
export { TimesheetActionLogs } from './timesheetActionLogs/types';
export { HolidayAdjustmentAdd, HolidayAdjustmentRemove } from './holidayAdjustment/types';
export { HourType } from './hourTypes/types';
export { UserEvent, UserEventCreate } from './userEvents/types';
export { CalculationStates } from './calculationStates/types';
export * from './workingTimeBalanceRules/types';
export * from './workingTimeCycles/types';
export * from './timeTrackingChangelogs/types';
export * from './paidBreaksHistory/types';

const DEFAULT_HOST = 'api.timetac.com';

export type TimeTacAxiosOptions = AxiosRequestConfig;

export type TimeTacAxiosResponse<T> = AxiosResponse<T>;

export type TimeTacConfigProvider = ConfigProvider;

export type TimeTacAxiosError = AxiosError;

export type TimeTacAxiosInstance = {
  get<R = unknown>(url: string, config?: TimeTacAxiosOptions): Promise<AxiosResponse<R>>;
  post<R = unknown>(url: string, data?: object, config?: TimeTacAxiosOptions): Promise<AxiosResponse<R>>;
  put<R = unknown>(url: string, data?: object, config?: TimeTacAxiosOptions): Promise<AxiosResponse<R>>;
  delete<R = unknown>(url: string, config?: TimeTacAxiosOptions): Promise<AxiosResponse<R>>;
};

export default class Api {
  public config: ConfigProvider;
  public state: ApiState;

  public absenceBans: AbsenceBansEndpoint;
  public absenceDays: AbsenceDaysEndpoint;
  public absences: AbsencesEndpoint;
  public absenceTypes: AbsenceTypesEndpoint;
  public authentication: AuthenticationEndpoint;
  public automaticBreakTemplates: AutomaticBreakTemplatesEndpoint;
  public clients: ClientsEndpoint;
  public countries: CountriesEndpoint;
  public deltaSync: DeltaSyncEndpoint;
  public departments: DepartmentsEndpoint;
  public favouriteTasks: FavouriteTasksEndpoint;
  public feedback: FeedbackEndpoint;
  public files: FilesEndpoint;
  public generalSettings: GeneralSettingsEndpoint;
  public geofence: GeofenceEndpoint;
  public geofenceToNodes: GeofenceToNodesEndpoint;
  public projects: ProjectsEndpoint;
  public recentTasks: RecentTasksEndpoint;
  public salutations: SalutationsEndpoint;
  public serverCommunication: ServerCommunicationEndpoint;
  public tasks: TasksEndpoint;
  public teamMembers: TeamMembersEndpoint;
  public teams: TeamsEndpoint;
  public timesheetAccountings: TimesheetAccountingsEndpoint;
  public timesheetActionLogs: TimesheetActionLogsEndpoint;
  public timeTrackingChangelogs: TimeTrackingChangelogsEndPoint;
  public timeTrackings: TimeTrackingsEndpoint;
  public timePlannings: TimePlanningsEndpoint;
  public translations: TranslationsEndpoint;
  public todoTasks: TodoTasksEndpoint;
  public users: UsersEndpoint;
  public userStatusOverview: UserStatusOverviewEndpoint;
  public userDefinedFieldDefinitions: UserDefinedFieldDefinitionsEndpoint;
  public userDefinedFieldDefinitionOptions: UserDefinedFieldDefinitionOptionsEndpoint;
  public userHistory: UserHistoryEndpoint;
  public changeTimeTrackingsRequest: ChangeTimeTrackingRequestEndpoint;
  public languages: LanguagesEndpoint;
  public legalDocumentAcceptanceLog: LegalDocumentAcceptanceLogEndpoint;
  public legalDocuments: LegalDocumentsEndpoint;
  public messages: MessagesEndpoint;
  public notifications: NotificationsEndpoint;
  public notificationsTypeHtml: NotificationsTypeHtmlEndpoint;
  public notificationUrls: NotificationUrlsEndpoint;
  public permissionResolveEntities: PermissionResolveEntitiesEndpoint;
  public permissionResolveUsers: PermissionResolveUsersEndpoint;
  public permissionResolveDepartments: PermissionResolveDepartmentsEndpoint;
  public permissionResolveAbsenceTypesAndUsers: PermissionResolveAbsenceTypesAndUsersEndpoint;
  public timezones: TimezonesEndpoint;
  public timesheetAccountingSummaries: TimesheetAccountingSummariesEndpoint;
  public userTemplateHistory: UserTemplateHistoryEndpoint;
  public workSchedules: WorkSchedulesEndpoint;
  public workScheduleDays: WorkScheduleDaysEndpoint;
  public workScheduleDayDefinitions: WorkScheduleDayDefinitionsEndpoint;
  public publicHolidayTemplates: PublicHolidayTemplatesEndpoint;
  public userRoles: UserRolesEndpoint;
  public jobQueues: JobQueuesEndpoint;
  public ssoConfig: SsoConfigEndpoint;
  public tiers: TiersEndpoint;
  public onboardingSteps: OnboardingStepsEndpoint;
  public onboardingStepToUsers: OnboardingStepToUserSEndpoint;
  public features: FeaturesEndpoint;
  public monitoringRules: MonitoringRulesEndpoint;
  public monitoringRuleTemplates: MonitoringRuleTemplatesEndpoint;
  public monitoringRuleRecipients: MonitoringRuleRecipientsEndpoint;
  public monitoringRuleIntervals: MonitoringRuleIntervalsEndpoint;
  public monitoringRuleFrequencies: MonitoringRuleFrequenciesEndpoint;
  public integrationCategories: IntegrationCategoriesEndpoint;
  public integrations: IntegrationsEndpoint;
  public integrationsToCategories: IntegrationsToCategoriesEndpoint;
  public publicHolidays: PublicHolidaysEndpoint;
  public holidayAdjustment: HolidayAdjustmentEndpoint;
  public hourTypes: HourTypesEndpoint;
  public fetchData: FetchDataEndpoint;
  public userEvents: UserEventsEndpoint;
  public workingTimeBalanceRules: WorkingTimeBalanceRulesEndpoint;
  public workingTimeCycles: WorkingTimeCyclesEndpoint;
  public userPreferences: UserPreferencesEndpoint;
  public calculationStates: CalculationStatesEndpoint;
  public paidBreaksHistory: PaidBreaksHistoryEndpoint;
  public otherPaidLeaveLimitations: OtherPaidLeaveLimitationsEndpoint;

  constructor(config: ApiConfig) {
    this.config = new ConfigProvider({
      ...config,
      shouldAutoRefreshToken: config.shouldAutoRefreshToken ?? true,
      https: config.https ?? true,
    });

    this.setBaseUrl();
    this.setTimeout(config.timeout ?? 30000);

    this.state = {
      refreshingToken: false,
    };

    this.absenceBans = new AbsenceBansEndpoint(this.config);
    this.absenceDays = new AbsenceDaysEndpoint(this.config);
    this.absences = new AbsencesEndpoint(this.config);
    this.absenceTypes = new AbsenceTypesEndpoint(this.config);
    this.authentication = new AuthenticationEndpoint(this.config);
    this.automaticBreakTemplates = new AutomaticBreakTemplatesEndpoint(this.config);
    this.clients = new ClientsEndpoint(this.config);
    this.countries = new CountriesEndpoint(this.config);
    this.deltaSync = new DeltaSyncEndpoint(this.config);
    this.departments = new DepartmentsEndpoint(this.config);
    this.favouriteTasks = new FavouriteTasksEndpoint(this.config);
    this.feedback = new FeedbackEndpoint(this.config);
    this.files = new FilesEndpoint(this.config);
    this.generalSettings = new GeneralSettingsEndpoint(this.config);
    this.projects = new ProjectsEndpoint(this.config);
    this.recentTasks = new RecentTasksEndpoint(this.config);
    this.salutations = new SalutationsEndpoint(this.config);
    this.serverCommunication = new ServerCommunicationEndpoint(this.config);
    this.tasks = new TasksEndpoint(this.config);
    this.teamMembers = new TeamMembersEndpoint(this.config);
    this.teams = new TeamsEndpoint(this.config);
    this.timesheetAccountings = new TimesheetAccountingsEndpoint(this.config);
    this.timesheetActionLogs = new TimesheetActionLogsEndpoint(this.config);
    this.timeTrackingChangelogs = new TimeTrackingChangelogsEndPoint(this.config);
    this.timeTrackings = new TimeTrackingsEndpoint(this.config);
    this.timePlannings = new TimePlanningsEndpoint(this.config);
    this.translations = new TranslationsEndpoint(this.config);
    this.todoTasks = new TodoTasksEndpoint(this.config);
    this.users = new UsersEndpoint(this.config);
    this.userStatusOverview = new UserStatusOverviewEndpoint(this.config);
    this.userDefinedFieldDefinitions = new UserDefinedFieldDefinitionsEndpoint(this.config);
    this.userDefinedFieldDefinitionOptions = new UserDefinedFieldDefinitionOptionsEndpoint(this.config);
    this.userHistory = new UserHistoryEndpoint(this.config);
    this.changeTimeTrackingsRequest = new ChangeTimeTrackingRequestEndpoint(this.config);
    this.languages = new LanguagesEndpoint(this.config);
    this.legalDocumentAcceptanceLog = new LegalDocumentAcceptanceLogEndpoint(this.config);
    this.legalDocuments = new LegalDocumentsEndpoint(this.config);
    this.messages = new MessagesEndpoint(this.config);
    this.notifications = new NotificationsEndpoint(this.config);
    this.notificationsTypeHtml = new NotificationsTypeHtmlEndpoint(this.config);
    this.notificationUrls = new NotificationUrlsEndpoint(this.config);
    this.permissionResolveEntities = new PermissionResolveEntitiesEndpoint(this.config);
    this.permissionResolveUsers = new PermissionResolveUsersEndpoint(this.config);
    this.permissionResolveDepartments = new PermissionResolveDepartmentsEndpoint(this.config);
    this.timezones = new TimezonesEndpoint(this.config);
    this.timesheetAccountingSummaries = new TimesheetAccountingSummariesEndpoint(this.config);
    this.userTemplateHistory = new UserTemplateHistoryEndpoint(this.config);
    this.permissionResolveAbsenceTypesAndUsers = new PermissionResolveAbsenceTypesAndUsersEndpoint(this.config);
    this.workSchedules = new WorkSchedulesEndpoint(this.config);
    this.workScheduleDays = new WorkScheduleDaysEndpoint(this.config);
    this.workScheduleDayDefinitions = new WorkScheduleDayDefinitionsEndpoint(this.config);
    this.publicHolidayTemplates = new PublicHolidayTemplatesEndpoint(this.config);
    this.userRoles = new UserRolesEndpoint(this.config);
    this.jobQueues = new JobQueuesEndpoint(this.config);
    this.ssoConfig = new SsoConfigEndpoint(this.config);
    this.tiers = new TiersEndpoint(this.config);
    this.onboardingSteps = new OnboardingStepsEndpoint(this.config);
    this.onboardingStepToUsers = new OnboardingStepToUserSEndpoint(this.config);
    this.features = new FeaturesEndpoint(this.config);
    this.monitoringRules = new MonitoringRulesEndpoint(this.config);
    this.monitoringRuleIntervals = new MonitoringRuleIntervalsEndpoint(this.config);
    this.monitoringRuleFrequencies = new MonitoringRuleFrequenciesEndpoint(this.config);
    this.monitoringRuleTemplates = new MonitoringRuleTemplatesEndpoint(this.config);
    this.monitoringRuleRecipients = new MonitoringRuleRecipientsEndpoint(this.config);
    this.geofence = new GeofenceEndpoint(this.config);
    this.geofenceToNodes = new GeofenceToNodesEndpoint(this.config);
    this.integrationCategories = new IntegrationCategoriesEndpoint(this.config);
    this.integrations = new IntegrationsEndpoint(this.config);
    this.integrationsToCategories = new IntegrationsToCategoriesEndpoint(this.config);
    this.publicHolidays = new PublicHolidaysEndpoint(this.config);
    this.fetchData = new FetchDataEndpoint(this.config);
    this.userEvents = new UserEventsEndpoint(this.config);
    this.workingTimeBalanceRules = new WorkingTimeBalanceRulesEndpoint(this.config);
    this.workingTimeCycles = new WorkingTimeCyclesEndpoint(this.config);
    this.userPreferences = new UserPreferencesEndpoint(this.config);
    this.calculationStates = new CalculationStatesEndpoint(this.config);
    this.otherPaidLeaveLimitations = new OtherPaidLeaveLimitationsEndpoint(this.config);

    this.holidayAdjustment = new HolidayAdjustmentEndpoint(this.config);
    this.hourTypes = new HourTypesEndpoint(this.config);
    this.paidBreaksHistory = new PaidBreaksHistoryEndpoint(this.config);

    useInterceptors({ state: this.state, config: this.config, authentication: this.authentication });
  }

  public setBaseUrl() {
    setAxiosDefaults({
      baseURL: `${this.config.settings.https == true ? 'https' : 'http'}://${this.config.settings.host ?? DEFAULT_HOST}`,
    });
  }

  public setTimeout(timeout: number): void {
    setAxiosDefaults({
      timeout: timeout,
    });
  }

  public setAccount(account: string): void {
    this.config.settings.account = account;
  }

  public getCustomRequestHeaders(): { [key: string]: string } | undefined {
    return this.config.settings.customRequestHeaders;
  }

  public setCustomRequestHeaders(customRequestHeaders: { [key: string]: string }): void {
    this.config.settings.customRequestHeaders = { ...this.getCustomRequestHeaders(), ...customRequestHeaders };
  }

  public getAxios(): TimeTacAxiosInstance {
    return {
      get: (url, config) => axios.get(url, config),
      post: (url, data, config) => axios.post(url, data, config),
      put: (url, data, config) => axios.put(url, data, config),
      delete: (url, config) => axios.delete(url, config),
    };
  }

  public get apiPath(): string {
    if (this.config.settings.account == null) {
      console.warn('Account is not set, using default host');
    }
    const accountUrl = `${axios.defaults.baseURL ?? DEFAULT_HOST}/${this.config.settings.account}/`;
    const apiPrefix =
      this.config.settings.apiPrefix === undefined
        ? 'userapi/'
        : this.config.settings.apiPrefix.length > 0
          ? `${this.config.settings.apiPrefix}`
          : '';
    const apiPath = `${accountUrl}${apiPrefix}v${this.config.settings.version ?? DEFAULT_API_VERSION}/`;
    return apiPath;
  }

  public get configuration(): ConfigProvider {
    return this.config;
  }
}
