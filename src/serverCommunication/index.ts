import axios from 'axios';
import Base from '../baseApi';
import { ServerCommunication as Model } from './types';
import { toApiResponse } from '../utils/response/responseHandlers';
import { ApiResponse } from '../utils/response/apiResponse';

const resourceName = 'serverCommunication';

export default class ServerCommunication extends Base {
  read(account: string) {
    this.setAccount(account);
    const response = axios.get<ApiResponse<Model>>(`${this.getApiPath()}${resourceName}/read`, { withCredentials: false });
    return toApiResponse(response);
  }
}
