import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParamBuilder';
import * as responseHandlers from '../utils/response/responseHandlers';
import { UserStatusOverview } from './types';

export class UserStatusOverviewsEndpoint extends BaseApi {
  public readonly resourceName = 'userStatusOverview';

  public read(params?: RequestParams<UserStatusOverview>): Promise<UserStatusOverview[]> {
    const response = this._get<UserStatusOverview[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }
  public readById(id: number, params?: RequestParams<UserStatusOverview>): Promise<UserStatusOverview> {
    const response = this._get<UserStatusOverview[]>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandlers.required(response);
  }
}
