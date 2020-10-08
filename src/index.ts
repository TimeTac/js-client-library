import Authentication from './oauth';
import Users from './users';
import Timetrackings from './timetrackings';
import ServerCommunication from './serverCommunication';
import { ApiConfig } from './baseApi';
import { Credentials } from './oauth/types';
import DeltaSync from './deltaSync';

export { SyncResource, SyncData, SyncResourceField } from './deltaSync/types';
export { Project } from './projects/types';
export { Task };

export default class Api {
  public config: ApiConfig;

  public users: Users;
  public authentication: Authentication;
  public timeTrackings: Timetrackings;
  public serverCommunication: ServerCommunication;
  public deltaSync: DeltaSync;

  constructor(config: ApiConfig) {
    this.config = config;

    this.authentication = new Authentication(this.config);
    this.users = new Users(this.config);
    this.timeTrackings = new Timetrackings(this.config);
    this.serverCommunication = new ServerCommunication(this.config);
    this.deltaSync = new DeltaSync(this.config);
  }

  setAccount(account: string) {
    this.config.account = account;
  }

  static async withCredentials(config: ApiConfig, credentials: Credentials): Promise<Api> {
    const api = new Api(config);
    await api.authentication.login(credentials);
    return api;
  }
}
