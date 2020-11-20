import BaseApi from '../baseApi';
import RequestParams from '../utils/requestParams/requestParams';
import { User } from './types';
import { required, requiredList } from '../utils/response/responseHandlers';

export default class Users extends BaseApi {
  public readonly resourceName = 'users';

  public read(requestParams?: RequestParams<User> | Object): Promise<User[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<User[]>(`${this.getResourceName()}/read`, { params });
    return requiredList(response);
  }

  public readById(id: number, requestParams?: RequestParams<User> | Object): Promise<User> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<User[]>(`${this.getResourceName()}/read/${id}`, { params });
    return required(response);
  }

  public readMe(requestParams?: RequestParams<User> | Object): Promise<User> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<User[]>(`${this.getResourceName()}/me`, { params });
    return required(response);
  }

  public create(): Promise<User> {
    throw new Error('not Implemented');
  }

  public update(): Promise<User> {
    throw new Error('not Implemented');
  }
}
