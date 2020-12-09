import AbsenceDays from './absenceDays';
import Absences from './absences';
import AbsenceTypes from './absenceTypes';
import Authentication from './authentication';
import { Credentials } from './authentication/types';
import { ApiConfig } from './baseApi';
import DeltaSync from './deltaSync';
import Departments from './departments';
import FavouriteTasks from './favouriteTasks';
import GeneralSettings from './generalSettings';
import Projects from './projects';
import ServerCommunication from './serverCommunication';
import Tasks from './tasks';
import TeamMembers from './teamMembers';
import Teams from './teams';
import TimesheetAccountings from './timesheetAccountings';
import Timetrackings from './timetrackings';
import TodoTasks from './todoTasks';
import Users from './users';
import UserStatusOverviews from './userStatusOverview';
import RequestParams from './utils/requestParams/requestParams';

export { AbsenceDay } from './absenceDays/types';
export { Absence, AbsenceApprove, AbsenceCreate, AbsenceReject, AbsenceStatus, AbsenceUpdate } from './absences/types';
export { AbsenceType } from './absenceTypes/types';
export { Credentials } from './authentication/types';
export { SyncData, SyncResource, SyncResourceField } from './deltaSync/types';
export { Department } from './departments/types';
export { FavouriteTask, FavouriteTaskCreate } from './favouriteTasks/types';
export { GeneralSetting } from './generalSettings/types';
export { Project } from './projects/types';
export { ServerCommunication } from './serverCommunication/types';
export { Task } from './tasks/types';
export { TeamMember } from './teamMembers/types';
export { Team } from './teams/types';
export { TimesheetAccounting } from './timesheetAccountings/types';
export { TimeTracking, TimeTrackingCreate, StartTimeTrackingData, StopTimeTrackingData } from './timetrackings/types';
export { TodoTask, TodoTaskCreate } from './todoTasks/types';
export { User } from './users/types';
export * from './userStatusOverview/types';
export { RequestParams };

export default class Api {
  public config: ApiConfig;

  public absenceDays: AbsenceDays;
  public absences: Absences;
  public absenceTypes: AbsenceTypes;
  public authentication: Authentication;
  public deltaSync: DeltaSync;
  public departments: Departments;
  public favouriteTasks: FavouriteTasks;
  public generalSettings: GeneralSettings;
  public projects: Projects;
  public serverCommunication: ServerCommunication;
  public tasks: Tasks;
  public teamMembers: TeamMembers;
  public teams: Teams;
  public timesheetAccountings: TimesheetAccountings;
  public timeTrackings: Timetrackings;
  public todoTasks: TodoTasks;
  public users: Users;
  public userStatusOverviews: UserStatusOverviews;

  constructor(config: ApiConfig) {
    this.config = config;

    this.absenceDays = new AbsenceDays(this.config);
    this.absences = new Absences(this.config);
    this.absenceTypes = new AbsenceTypes(this.config);
    this.authentication = new Authentication(this.config);
    this.deltaSync = new DeltaSync(this.config);
    this.departments = new Departments(this.config);
    this.favouriteTasks = new FavouriteTasks(this.config);
    this.generalSettings = new GeneralSettings(this.config);
    this.projects = new Projects(this.config);
    this.serverCommunication = new ServerCommunication(this.config);
    this.tasks = new Tasks(this.config);
    this.teamMembers = new TeamMembers(this.config);
    this.teams = new Teams(this.config);
    this.timesheetAccountings = new TimesheetAccountings(this.config);
    this.timeTrackings = new Timetrackings(this.config);
    this.todoTasks = new TodoTasks(this.config);
    this.users = new Users(this.config);
    this.userStatusOverviews = new UserStatusOverviews(this.config);
  }

  public setAccount(account: string) {
    this.config.account = account;
  }

  static async withCredentials(config: ApiConfig, credentials: Credentials): Promise<Api> {
    const api = new Api(config);
    await api.authentication.login(credentials);
    return api;
  }
}
