import axios from 'axios';
import Base from '../baseApi';
import responseHandlers from '../utils/responseHandlers';
import { ServerCommunication as Model } from './types';

const resourceName = 'serverCommunication';

export default class ServerCommunication extends Base {
  get serverCommunication() {
    return this;
  }

  read(account: string): Promise<Model | undefined> {
    this.setAccount(account);
    const response = axios.get<Model>(`${this.getApiPath()}${resourceName}/read`, { withCredentials: false });
    return responseHandlers.optional(response);
  }
}
