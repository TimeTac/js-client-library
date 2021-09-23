import BaseApi from '../baseApi';
import { LibraryReturn } from '../utils/response/apiResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import { ServerCommunication } from './types';

const resourceName = 'serverCommunication';

export class ServerCommunicationEndpoint extends BaseApi<typeof resourceName> {
  public readonly resourceName = resourceName;

  async read(account: string): Promise<LibraryReturn<typeof resourceName, ServerCommunication>> {
    this.setAccount(account);
    const response = this._get<typeof resourceName>('read', { withCredentials: false });
    return responseHandlers.serverCommunication(response);
  }
}
