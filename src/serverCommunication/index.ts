import axios, { AxiosResponse } from 'axios';
import { stringify } from 'type-qs';
import Base from '../baseApi';

const resourceName = 'serverCommunication';

export default class ServerCommunication extends Base {
  get serverCommunication() {
    return this;
  }

  read(account: string) {
    this.setAccount(account);
    return axios.get(`${this.getApiPath()}${resourceName}/read`, { withCredentials: false });
  }
}
