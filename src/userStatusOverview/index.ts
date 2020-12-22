import BaseApi from '../baseApi';
import RequestParams from '../utils/requestParams/requestParams';
import { UserStatusOverview } from './types';
import * as responseHandlers from '../utils/response/responseHandlers';

export class UserStatusOverviewsEndpoint extends BaseApi {
  public readonly resourceName = 'userStatusOverview';

  public read(requestParams?: RequestParams<UserStatusOverview> | Object): Promise<UserStatusOverview[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<UserStatusOverview[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }
  public readById(id: number, requestParams?: RequestParams<UserStatusOverview> | Object): Promise<UserStatusOverview> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<UserStatusOverview[]>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandlers.required(response);
  }
}
