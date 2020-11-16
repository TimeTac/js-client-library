import axios from 'axios';
import Base from '../baseApi';
import responseHandlers from '../utils/response/responseHandlers';
import { ServerCommunication as Model } from './types';

const resourceName = 'serverCommunication';

export default class ServerCommunication extends Base {
  read(account: string) {
    this.setAccount(account);
    const response = axios.get<Model>(`${this.getApiPath()}${resourceName}/read`, { withCredentials: false });
    return responseHandlers.toApiResponse<ServerCommunication>(response);
  }
}
