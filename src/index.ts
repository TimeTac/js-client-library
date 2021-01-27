import { AbsenceDaysEndpoint } from './absenceDays';
import { AbsencesEndpoint } from './absences';
import { AbsenceTypesEndpoint } from './absenceTypes';
import { AuthenticationEndpoint } from './authentication';
import { ApiConfig, ApiState } from './baseApi';
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
import { TimesheetAccountingsEndpoint } from './timesheetAccountings';
import { TimeTrackingsEndpoint } from './timetrackings';
import { TodoTasksEndpoint } from './todoTasks';
import { UsersEndpoint } from './users';
import { UserStatusOverviewsEndpoint } from './userStatusOverview';
import { interceptor, setAxiosDefaults } from './utils/axiosSetup';

export { AbsenceDay } from './absenceDays/types';
export { Absence, AbsenceApprove, AbsenceCreate, AbsenceReject, AbsenceUpdate } from './absences/types';
export { AbsenceType } from './absenceTypes/types';
export { Credentials } from './authentication/types';
export { Tokens } from './baseApi';
export { DeltaSyncResults } from './deltaSync/types';
export { Department } from './departments/types';
export * from './enums';
export { AbsenceDayType, AbsenceDurationUnit, AbsenceStatus, UserStatusOverviewStatus } from './enums';
export { FavouriteTask, FavouriteTaskCreate } from './favouriteTasks/types';
export { GeneralSetting } from './generalSettings/types';
export { Project } from './projects/types';
export { RecentTask, RecentTaskCreate } from './recentTasks/types';
export { ServerCommunication } from './serverCommunication/types';
export { Task } from './tasks/types';
export { TeamMember } from './teamMembers/types';
export { Team } from './teams/types';
export { TimesheetAccounting } from './timesheetAccountings/types';
export { StartTimeTrackingData, StopTimeTrackingData, TimeTracking, TimeTrackingCreate } from './timetrackings/types';
export { TodoTask, TodoTaskCreate } from './todoTasks/types';
export { User } from './users/types';
export { UserStatusOverview } from './userStatusOverview/types';
export { DeltaSyncParams } from './utils/params/deltaSyncParams';
export { RequestParams } from './utils/params/requestParams';
export { DeltaSyncResponse } from './utils/response/deltaSyncResponse';
export { DeletedEntry, ResourceResponse } from './utils/response/resourceResponse';

const DEFAULT_HOST = 'go.timetac.com';

export default class Api {
  public config: ApiConfig;
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
  public todoTasks: TodoTasksEndpoint;
  public users: UsersEndpoint;
  public userStatusOverviews: UserStatusOverviewsEndpoint;

  constructor(config: ApiConfig) {
    this.config = config;
    this.config.autoRefreshToken = config.autoRefreshToken ?? true;
    this.config.https = config.https ?? true;

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
    this.todoTasks = new TodoTasksEndpoint(this.config);
    this.users = new UsersEndpoint(this.config);
    this.userStatusOverviews = new UserStatusOverviewsEndpoint(this.config);

    interceptor({ state: this.state, config: this.config, authentication: this.authentication });
    setAxiosDefaults({ baseURL: `${this.config.https ? 'https' : 'http'}://${this.config.host ?? DEFAULT_HOST}/` });
  }

  public setAccount(account: string) {
    this.config.account = account;
  }
}
