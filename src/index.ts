import { AbsenceDaysEndpoint } from './absenceDays';
import { AbsencesEndpoint } from './absences';
import { AbsenceTypesEndpoint } from './absenceTypes';
import { AuthenticationEndpoint } from './authentication';
import { ApiConfig, ApiState } from './baseApi';
import { ChangeTimeTrackingRequestEndpoint } from './changeTimeTrackingRequests';
import { DeltaSyncEndpoint } from './deltaSync';
import { DepartmentsEndpoint } from './departments';
import { FavouriteTasksEndpoint } from './favouriteTasks';
import { GeneralSettingsEndpoint } from './generalSettings';
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
import { TodoTasksEndpoint } from './todoTasks';
import { UserDefinedFieldDefinitionOptionsEndpoint } from './userDefinedFieldDefinitionOptions';
import { UserDefinedFieldDefinitionsEndpoint } from './userDefinedFieldDefinitions';
import { UsersEndpoint } from './users';
import { UserStatusOverviewsEndpoint } from './userStatusOverview';
import { ConfigProvider } from './utils';
import { setAxiosDefaults, useInterceptors } from './utils/axiosSetup';

export { AbsenceDay } from './absenceDays/types';
export { Absence, AbsenceApprove, AbsenceCreate, AbsenceReject, AbsenceUpdate } from './absences/types';
export { AbsenceType } from './absenceTypes/types';
export { Credentials } from './authentication/types';
export { Tokens } from './baseApi';
export { ChangeTimeTrackingRequest } from './changeTimeTrackingRequests/types';
export { DeltaSyncResults } from './deltaSync/types';
export { Department } from './departments/types';
export * from './enums';
export { ErrorFormat } from './errors';
export { FavouriteTask, FavouriteTaskCreate } from './favouriteTasks/types';
export { GeneralSetting } from './generalSettings/types';
export { Project } from './projects/types';
export { RecentTask } from './recentTasks/types';
export { ServerCommunication } from './serverCommunication/types';
export { Task, TaskCreate } from './tasks/types';
export { TeamMember } from './teamMembers/types';
export { Team } from './teams/types';
export { TimePlanning } from './timeplannings/types';
export { TimesheetAccounting } from './timesheetAccountings/types';
export { StartTimeTrackingData, StopTimeTrackingData, TimeTracking, TimeTrackingCreate } from './timetrackings/types';
export { Timezone } from './timezones/types';
export { TodoTask, TodoTaskCreate } from './todoTasks/types';
export { UserDefinedFieldDefinitionOptions } from './userDefinedFieldDefinitionOptions/types';
export { UserDefinedFieldDefinitions, UserDefinedFieldDefinitionsIds } from './userDefinedFieldDefinitions/types';
export { User, UserUpdate } from './users/types';
export { UserStatusOverview } from './userStatusOverview/types';
export { Pages } from './utils/pages/pages';
export { DeltaSyncParams } from './utils/params/deltaSyncParams';
export { RequestParams, RequestParamsBuilder } from './utils/params/requestParams';
export { ApiResponse, ApiResponseOnFailure, ApiResponseOnSuccess } from './utils/response/apiResponse';
export { DeltaSyncResponse } from './utils/response/deltaSyncResponse';
export { RawApiResponse } from './utils/response/rawApiResponse';
export { ReadRawResponse } from './utils/response/readRawResponse';
export { DeletedEntry, ResourceResponse } from './utils/response/resourceResponse';
export { UpdateRawResponse } from './utils/response/updateRawResponse';

const DEFAULT_HOST = 'go.timetac.com';

export default class Api {
  public config: ConfigProvider;
  public state: ApiState;

  public absenceDays: AbsenceDaysEndpoint;
  public absences: AbsencesEndpoint;
  public absenceTypes: AbsenceTypesEndpoint;
  public authentication: AuthenticationEndpoint;
  public deltaSync: DeltaSyncEndpoint;
  public departments: DepartmentsEndpoint;
  public favouriteTasks: FavouriteTasksEndpoint;
  public generalSettings: GeneralSettingsEndpoint;
  public projects: ProjectsEndpoint;
  public recentTasks: RecentTasksEndpoint;
  public serverCommunication: ServerCommunicationEndpoint;
  public tasks: TasksEndpoint;
  public teamMembers: TeamMembersEndpoint;
  public teams: TeamsEndpoint;
  public timesheetAccountings: TimesheetAccountingsEndpoint;
  public timeTrackings: TimeTrackingsEndpoint;
  public timePlannings: TimePlanningsEndpoint;
  public todoTasks: TodoTasksEndpoint;
  public users: UsersEndpoint;
  public userStatusOverviews: UserStatusOverviewsEndpoint;
  public userDefinedFieldDefinitions: UserDefinedFieldDefinitionsEndpoint;
  public userDefinedFieldDefinitionOptions: UserDefinedFieldDefinitionOptionsEndpoint;
  public changeTimeTrackingsRequest: ChangeTimeTrackingRequestEndpoint;
  public timezones: TimezonesEndpoint;

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

    this.absenceDays = new AbsenceDaysEndpoint(this.config);
    this.absences = new AbsencesEndpoint(this.config);
    this.absenceTypes = new AbsenceTypesEndpoint(this.config);
    this.authentication = new AuthenticationEndpoint(this.config);
    this.deltaSync = new DeltaSyncEndpoint(this.config);
    this.departments = new DepartmentsEndpoint(this.config);
    this.favouriteTasks = new FavouriteTasksEndpoint(this.config);
    this.generalSettings = new GeneralSettingsEndpoint(this.config);
    this.projects = new ProjectsEndpoint(this.config);
    this.recentTasks = new RecentTasksEndpoint(this.config);
    this.serverCommunication = new ServerCommunicationEndpoint(this.config);
    this.tasks = new TasksEndpoint(this.config);
    this.teamMembers = new TeamMembersEndpoint(this.config);
    this.teams = new TeamsEndpoint(this.config);
    this.timesheetAccountings = new TimesheetAccountingsEndpoint(this.config);
    this.timeTrackings = new TimeTrackingsEndpoint(this.config);
    this.timePlannings = new TimePlanningsEndpoint(this.config);
    this.todoTasks = new TodoTasksEndpoint(this.config);
    this.users = new UsersEndpoint(this.config);
    this.userStatusOverviews = new UserStatusOverviewsEndpoint(this.config);
    this.userDefinedFieldDefinitions = new UserDefinedFieldDefinitionsEndpoint(this.config);
    this.userDefinedFieldDefinitionOptions = new UserDefinedFieldDefinitionOptionsEndpoint(this.config);
    this.changeTimeTrackingsRequest = new ChangeTimeTrackingRequestEndpoint(this.config);
    this.timezones = new TimezonesEndpoint(this.config);

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
