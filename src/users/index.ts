import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import RequestParams from '../utils/requestParams';
import { User } from './types';

export default class Users extends BaseApi {
  public readonly resourceName = 'users';

  public read(requestParams?: RequestParams<User> | Object): Promise<User[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<User[]>(`${this.getResourceName()}/read`, { params });
    return responseHandler.requiredList(response);
  }
  public readById(id: number, requestParams?: RequestParams<User> | Object): Promise<User> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<User>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandler.required(response);
  }
  public readMe(requestParams?: RequestParams<User> | Object): Promise<User> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get(`${this.getResourceName()}/me`, { params });
    return responseHandler.required(response);
  }
  public create(): Promise<User> {
    throw new Error('not Implemented');
  }
  public update(): Promise<User> {
    throw new Error('not Implemented');
  }
}
