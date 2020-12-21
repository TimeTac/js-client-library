import BaseApi from '../baseApi';
import { ServerCommunication } from './types';

export class ServerCommunicationEndpoint extends BaseApi {
  public readonly resourceName = 'serverCommunication';

  async read(account: string): Promise<ServerCommunication> {
    this.setAccount(account);
    const response = await this._get<ServerCommunication>(`${this.resourceName}/read`, { withCredentials: false });
    if (response.data.Success) {
      return response.data.Results;
    } else {
      throw response.data ?? response;
    }
  }
}
