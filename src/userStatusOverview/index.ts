import BaseApi from '../baseApi';
import { RequestConfig } from '../utils/configs/requestConfig';
import * as responseHandlers from '../utils/response/responseHandlers';
import { UserStatusOverview } from './types';

export class UserStatusOverviewsEndpoint extends BaseApi {
  public readonly resourceName = 'userStatusOverview';

  public read(config?: RequestConfig<UserStatusOverview>): Promise<UserStatusOverview[]> {
    const response = this._get<UserStatusOverview[]>(`${this.getResourceName()}/read`, config);
    return responseHandlers.list(response);
  }
  public readById(id: number, config?: RequestConfig<UserStatusOverview>): Promise<UserStatusOverview> {
    const response = this._get<UserStatusOverview[]>(`${this.getResourceName()}/read/${id}`, config);
    return responseHandlers.required(response);
  }
}
