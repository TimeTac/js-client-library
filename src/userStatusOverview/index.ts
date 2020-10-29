import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import RequestParams from '../utils/requestParams';
import { UserStatusOverview } from './types';

export default class UserStatusOverviews extends BaseApi {
  public readonly resourceName = 'userStatusOverview';

  public read(requestParams?: RequestParams<UserStatusOverview> | Object): Promise<UserStatusOverview[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<UserStatusOverview[]>(`${this.getResourceName()}/read`, { params });
    return responseHandler.requiredList(response);
  }
  public readById(id: number, requestParams?: RequestParams<UserStatusOverview> | Object): Promise<UserStatusOverview[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<UserStatusOverview[]>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandler.required(response);
  }
}
