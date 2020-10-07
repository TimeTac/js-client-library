import oAuth from './oauth';
import Users from './users';
import Timetrackings from './timetrackings';
import ServerCommunication from './serverCommunication';
import { ApiConfig } from './baseApi';
import { Credentials } from './oauth/types';

export default class Api {
  public config: ApiConfig;

  public users: Users;
  public oauth: oAuth;
  public timeTrackings: Timetrackings;
  public serverCommunication: ServerCommunication;

  constructor(config: ApiConfig) {
    this.config = config;

    this.oauth = new oAuth(this.config);
    this.users = new Users(this.config);
    this.timeTrackings = new Timetrackings(this.config);
    this.serverCommunication = new ServerCommunication(this.config);
  }

  setAccount(account: string) {
    this.config.account = account;
  }

  static async withCredentials(config: ApiConfig, credentials: Credentials): Promise<Api> {
    const api = new Api(config);
    await api.oauth.authenticate(credentials);
    return api;
  }
}
