import { AbsenceDaysEndpoint } from './absenceDays';
import { AbsencesEndpoint } from './absences';
import { AbsenceTypesEndpoint } from './absenceTypes';
import { AuthenticationEndpoint } from './authentication';
import { ApiConfig, ApiState } from './baseApi';
import { ChangeTimeTrackingRequestEndpoint } from './changeTimeTrackingRequests';
import { CountriesEndpoint } from './countries';
import { DeltaSyncEndpoint } from './deltaSync';
import { DepartmentsEndpoint } from './departments';
import { FavouriteTasksEndpoint } from './favouriteTasks';
import { FeedbackEndpoint } from './feedback';
import { GeneralSettingsEndpoint } from './generalSettings';
import { MessagesEndpoint } from './messages';
import { ProjectsEndpoint } from './projects';
import { RecentTasksEndpoint } from './recentTasks';
import { ServerCommunicationEndpoint } from './serverCommunication';
import { TasksEndpoint } from './tasks';
import { TeamMembersEndpoint } from './teamMembers';
import { TeamsEndpoint } from './teams';
import { TimePlanningsEndpoint } from './timeplannings';
import { TimesheetAccountingsEndpoint } from './timesheetAccountings';
import { TimeTrackingsEndpoint } from './timetrackings';
import { TimezonesEndpoint } from './timezones';
import { TranslationsEndpoint } from './translations';
import { TodoTasksEndpoint } from './todoTasks';
import { UserDefinedFieldDefinitionOptionsEndpoint } from './userDefinedFieldDefinitionOptions';
import { UserDefinedFieldDefinitionsEndpoint } from './userDefinedFieldDefinitions';
import { UsersEndpoint } from './users';
import { UserStatusOverviewEndpoint } from './userStatusOverview';
import { ConfigProvider } from './utils';
import { setAxiosDefaults, useInterceptors } from './utils/axiosSetup';
import { TimesheetAccountingSummariesEndpoint } from './timesheetAccountingSummaries';
import { AbsenceBansEndpoint } from './absenceBans';
import { PermissionResolveUsersEndpoint } from './permissions/permissionResolveUsers';
import { HealthRulesEndpoint } from './health/healthRules';
import { HealthDataEndpoint } from './health/healthData';
import { UserTemplateHistoryEndpoint } from './userTemplateHistory';
import { AccountEndpoint } from './account';

export { AbsenceBan } from './absenceBans/types';
export { AbsenceDay } from './absenceDays/types';
export { Absence, AbsenceApprove, AbsenceCreate, AbsenceReject, AbsenceUpdate } from './absences/types';
export { AbsenceType } from './absenceTypes/types';
export { Credentials } from './authentication/types';
export { Tokens } from './baseApi';
export { ChangeTimeTrackingRequest } from './changeTimeTrackingRequests/types';
export { DeltaSyncResults } from './deltaSync/types';
export { Department, DepartmentCreate } from './departments/types';
export * from './enums';
export { ErrorFormat } from './errors';
export { FavouriteTask, FavouriteTaskCreate } from './favouriteTasks/types';
export { Feedback } from './feedback/types';
export { GeneralSetting } from './generalSettings/types';
export { Message, MessageCreate } from './messages/types';
export { Project } from './projects/types';
export { RecentTask } from './recentTasks/types';
export { ServerCommunication } from './serverCommunication/types';
export { Task, TaskCreate } from './tasks/types';
export { TeamMember } from './teamMembers/types';
export { Team } from './teams/types';
export { TimePlanning } from './timeplannings/types';
export { TimesheetAccounting } from './timesheetAccountings/types';
export { Translation } from './translations/types';
export { StartTimeTrackingData, StopTimeTrackingData, TimeTracking, TimeTrackingCreate, TimeTrackingUpdate } from './timetrackings/types';
export { Timezone } from './timezones/types';
export { TodoTask, TodoTaskCreate } from './todoTasks/types';
export { UserDefinedFieldDefinitionOptions } from './userDefinedFieldDefinitionOptions/types';
export { UserDefinedFieldDefinitions, UserDefinedFieldDefinitionsIds } from './userDefinedFieldDefinitions/types';
export { User, UserUpdate, UserRead, UserCreate, UserReadMe, UserResetPassword, UserUpdatePassword } from './users/types';
export { UserStatusOverview } from './userStatusOverview/types';
export { testAxiosObject } from './utils/axiosSetup';
export { Pages } from './utils/pages/pages';
export { DeltaSyncParams } from './utils/params/deltaSyncParams';
export { RequestParams, RequestParamsBuilder } from './utils/params/requestParams';
export {
  ApiResponse,
  ApiResponseOnFailure,
  ApiResponseOnSuccess,
  LibraryReturn,
  ResourceNames,
  Resources,
  Entity,
  resourceNameArray,
} from './utils/response/apiResponse';
export { DeltaSyncResponse } from './utils/response/deltaSyncResponse';
export { RawApiResponse } from './utils/response/rawApiResponse';
export { ReadRawResponse } from './utils/response/readRawResponse';
export { DeletedEntry, ResourceResponse } from './utils/response/resourceResponse';
export { UpdateRawResponse } from './utils/response/updateRawResponse';
export { Account } from './account/types';
export { TimesheetAccountingSummaries, TimesheetAccountingSummariesRead } from './timesheetAccountingSummaries/types';
export { PermissionResolveUser } from './permissions/permissionResolveUsers/types';
export { HealthRule } from './health/healthRules/types';
export { HealthData } from './health/healthData/types';
export { Country } from './countries/types';
export { UserTemplateHistory } from './userTemplateHistory/types';

const DEFAULT_HOST = 'go.timetac.com';

export default class Api {
  public config: ConfigProvider;
  public state: ApiState;

  public account: AccountEndpoint;
  public absenceBans: AbsenceBansEndpoint;
  public absenceDays: AbsenceDaysEndpoint;
  public absences: AbsencesEndpoint;
  public absenceTypes: AbsenceTypesEndpoint;
  public authentication: AuthenticationEndpoint;
  public countries: CountriesEndpoint;
  public deltaSync: DeltaSyncEndpoint;
  public departments: DepartmentsEndpoint;
  public favouriteTasks: FavouriteTasksEndpoint;
  public feedback: FeedbackEndpoint;
  public generalSettings: GeneralSettingsEndpoint;
  public healthRules: HealthRulesEndpoint;
  public healthData: HealthDataEndpoint;
  public projects: ProjectsEndpoint;
  public recentTasks: RecentTasksEndpoint;
  public serverCommunication: ServerCommunicationEndpoint;
  public tasks: TasksEndpoint;
  public teamMembers: TeamMembersEndpoint;
  public teams: TeamsEndpoint;
  public timesheetAccountings: TimesheetAccountingsEndpoint;
  public timeTrackings: TimeTrackingsEndpoint;
  public timePlannings: TimePlanningsEndpoint;
  public translations: TranslationsEndpoint;
  public todoTasks: TodoTasksEndpoint;
  public users: UsersEndpoint;
  public userStatusOverview: UserStatusOverviewEndpoint;
  public userDefinedFieldDefinitions: UserDefinedFieldDefinitionsEndpoint;
  public userDefinedFieldDefinitionOptions: UserDefinedFieldDefinitionOptionsEndpoint;
  public changeTimeTrackingsRequest: ChangeTimeTrackingRequestEndpoint;
  public messages: MessagesEndpoint;
  public permissionResolveUsers: PermissionResolveUsersEndpoint;
  public timezones: TimezonesEndpoint;
  public timesheetAccountingSummaries: TimesheetAccountingSummariesEndpoint;
  public userTemplateHistory: UserTemplateHistoryEndpoint;

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

    this.account = new AccountEndpoint(this.config);
    this.absenceBans = new AbsenceBansEndpoint(this.config);
    this.absenceDays = new AbsenceDaysEndpoint(this.config);
    this.absences = new AbsencesEndpoint(this.config);
    this.absenceTypes = new AbsenceTypesEndpoint(this.config);
    this.authentication = new AuthenticationEndpoint(this.config);
    this.countries = new CountriesEndpoint(this.config);
    this.deltaSync = new DeltaSyncEndpoint(this.config);
    this.departments = new DepartmentsEndpoint(this.config);
    this.favouriteTasks = new FavouriteTasksEndpoint(this.config);
    this.feedback = new FeedbackEndpoint(this.config);
    this.generalSettings = new GeneralSettingsEndpoint(this.config);
    this.healthRules = new HealthRulesEndpoint(this.config);
    this.healthData = new HealthDataEndpoint(this.config);
    this.projects = new ProjectsEndpoint(this.config);
    this.recentTasks = new RecentTasksEndpoint(this.config);
    this.serverCommunication = new ServerCommunicationEndpoint(this.config);
    this.tasks = new TasksEndpoint(this.config);
    this.teamMembers = new TeamMembersEndpoint(this.config);
    this.teams = new TeamsEndpoint(this.config);
    this.timesheetAccountings = new TimesheetAccountingsEndpoint(this.config);
    this.timeTrackings = new TimeTrackingsEndpoint(this.config);
    this.timePlannings = new TimePlanningsEndpoint(this.config);
    this.translations = new TranslationsEndpoint(this.config);
    this.todoTasks = new TodoTasksEndpoint(this.config);
    this.users = new UsersEndpoint(this.config);
    this.userStatusOverview = new UserStatusOverviewEndpoint(this.config);
    this.userDefinedFieldDefinitions = new UserDefinedFieldDefinitionsEndpoint(this.config);
    this.userDefinedFieldDefinitionOptions = new UserDefinedFieldDefinitionOptionsEndpoint(this.config);
    this.changeTimeTrackingsRequest = new ChangeTimeTrackingRequestEndpoint(this.config);
    this.messages = new MessagesEndpoint(this.config);
    this.permissionResolveUsers = new PermissionResolveUsersEndpoint(this.config);
    this.timezones = new TimezonesEndpoint(this.config);
    this.timesheetAccountingSummaries = new TimesheetAccountingSummariesEndpoint(this.config);
    this.userTemplateHistory = new UserTemplateHistoryEndpoint(this.config);

    useInterceptors({ state: this.state, config: this.config, authentication: this.authentication });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
}
