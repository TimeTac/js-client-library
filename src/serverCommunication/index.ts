import axios from 'axios';
import Base from '../baseApi';
import responseHandlers from '../utils/response/responseHandlers';
import { ServerCommunication as Model } from './types';

export default class ServerCommunication extends Base {
  public readonly resourceName = 'serverCommunication';

  public read(account: string): Promise<Model> {
    this.setAccount(account);
    const response = axios.get<Model>(`${this.getApiPath()}${this.resourceName}/read`, { withCredentials: false });
    return responseHandlers.requiredObject<Model>(response);
  }
}
