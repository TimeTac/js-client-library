import BaseApi from '../baseApi';
import { ServerCommunication } from './types';

export class ServerCommunicationEndpoint extends BaseApi {
  public readonly resourceName = 'serverCommunication';

  async read(account: string): Promise<ServerCommunication> {
    this.setAccount(account);
    const response = await this._get<ServerCommunication>(`${this.resourceName}/read`, { withCredentials: false });
    if (response.data.Success && response.data.Results !== undefined) {
      return response.data.Results;
    }

    throw 'Connection problem';
  }
}
