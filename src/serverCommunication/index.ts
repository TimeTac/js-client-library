import BaseApi from '../baseApi';
import * as responseHandlers from '../utils/response/responseHandlers';
import { ServerCommunication } from './types';

export class ServerCommunicationEndpoint extends BaseApi {
  public readonly resourceName = 'serverCommunication';

  async read(account: string): Promise<ServerCommunication> {
    this.setAccount(account);
    const response = this._get<ServerCommunication>(`${this.resourceName}/read`, { withCredentials: false });
    return responseHandlers.requiredSingle(response);
  }
}
