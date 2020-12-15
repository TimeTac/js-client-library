import { ApiConfig, ApiState } from './baseApi';
import { Credentials } from './authentication/types';
import RequestParams from './utils/requestParams/requestParams';

import AbsenceDays from './absenceDays';
import Absences from './absences';
import AbsenceTypes from './absenceTypes';
import Authentication from './authentication';
import DeltaSync from './deltaSync';
import Departments from './departments';
import Projects from './projects';
import ServerCommunication from './serverCommunication';
import Tasks from './tasks';
import TeamMembers from './teamMembers';
import Teams from './teams';
import TimesheetAccountings from './timesheetAccountings';
import Timetrackings from './timetrackings';
import Users from './users';
import UserStatusOverviews from './userStatusOverview';
import GeneralSettings from './generalSettings';
import axios from 'axios';

export { AbsenceDay } from './absenceDays/types';
export { Absence, AbsenceStatus, AbsenceApprove, AbsenceUpdate, AbsenceReject, AbsenceCreate } from './absences/types';
export { AbsenceType } from './absenceTypes/types';
export { Credentials } from './authentication/types';
export { SyncResource, SyncData, SyncResourceField } from './deltaSync/types';
export { Department } from './departments/types';
export { GeneralSetting } from './generalSettings/types';
export { Project } from './projects/types';
export { ServerCommunication } from './serverCommunication/types';
export { Task } from './tasks/types';
export { TeamMember } from './teamMembers/types';
export { Team } from './teams/types';
export { TimesheetAccounting } from './timesheetAccountings/types';
export { TimeTracking, TimeTrackingCreate, StartTimeTrackingData, StopTimeTrackingData } from './timetrackings/types';
export { User } from './users/types';
export * from './userStatusOverview/types';
export { RequestParams };

export default class Api {
  public config: ApiConfig;
  public state: ApiState;

  public absenceDays: AbsenceDays;
  public absences: Absences;
  public absenceTypes: AbsenceTypes;
  public authentication: Authentication;
  public deltaSync: DeltaSync;
  public departments: Departments;
  public generalSettings: GeneralSettings;
  public projects: Projects;
  public serverCommunication: ServerCommunication;
  public tasks: Tasks;
  public teamMembers: TeamMembers;
  public teams: Teams;
  public timesheetAccountings: TimesheetAccountings;
  public timeTrackings: Timetrackings;
  public users: Users;
  public userStatusOverviews: UserStatusOverviews;

  constructor(config: ApiConfig) {
    this.config = config;
    this.config.autoRefreshToken = config.autoRefreshToken || true;
    this.state = {
      refreshingToken: false,
    };

    this.absenceDays = new AbsenceDays(this.config);
    this.absences = new Absences(this.config);
    this.absenceTypes = new AbsenceTypes(this.config);
    this.authentication = new Authentication(this.config);
    this.deltaSync = new DeltaSync(this.config);
    this.departments = new Departments(this.config);
    this.generalSettings = new GeneralSettings(this.config);
    this.projects = new Projects(this.config);
    this.serverCommunication = new ServerCommunication(this.config);
    this.tasks = new Tasks(this.config);
    this.teamMembers = new TeamMembers(this.config);
    this.teams = new Teams(this.config);
    this.timesheetAccountings = new TimesheetAccountings(this.config);
    this.timeTrackings = new Timetrackings(this.config);
    this.users = new Users(this.config);
    this.userStatusOverviews = new UserStatusOverviews(this.config);

    axios.interceptors.response.use(
      (res) => {
        return res;
      },
      async (error) => {
        if (this.config.autoRefreshToken) {
          const untouchedRequest = error.config;

          if (error.response.status === 401 && untouchedRequest.url.indexOf('auth/oauth2/token') !== -1) {
            return Promise.reject(error);
          }
          if (error.response.status === 401 && !untouchedRequest._retry) {
            untouchedRequest._retry = true;

            if (!this.state.refreshingToken) {
              this.state.refreshingToken = this.authentication.refreshToken();
            }
            this.state.refreshingToken.then(async (res) => {
              if (res.status === 200) {
                const { access_token: accessToken, refresh_token: refreshToken } = res.data;
                this.authentication.setTokens({ accessToken, refreshToken });
                untouchedRequest.headers.Authorization = `Bearer ${accessToken}`;
                if (this.config.onTokenRefreshedCallback) {
                  this.config.onTokenRefreshedCallback({ accessToken, refreshToken });
                }
                return axios(untouchedRequest);
              }
            });
          }
          return Promise.reject(error.response);
        }
        return error.response;
      }
    );
  }

  public setAccount(account: string) {
    this.config.account = account;
  }
}
