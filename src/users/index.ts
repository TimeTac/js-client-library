import BaseApi from '../baseApi';
import RequestParams from '../utils/params/requestParams';
import { User } from './types';
import * as responseHandlers from '../utils/response/responseHandlers';
import { ApiResponseOnSuccess } from '../utils/response/apiResponse';

export class UsersEndpoint extends BaseApi {
  public readonly resourceName = 'users';

  public read(requestParams?: RequestParams<User> | Object): Promise<User[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<User[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }
  public readRaw(requestParams?: RequestParams<User> | Object): Promise<ApiResponseOnSuccess<User[]>> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<User[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.toApiResponse(response);
  }
  public readById(id: number, requestParams?: RequestParams<User> | Object): Promise<User> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<User[]>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandlers.required(response);
  }

  public readMe(requestParams?: RequestParams<User> | Object): Promise<User> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<User[]>(`${this.getResourceName()}/me`, { params });
    return responseHandlers.required(response);
  }

  public create(): Promise<User> {
    throw new Error('not Implemented');
  }

  public update(): Promise<User> {
    throw new Error('not Implemented');
  }
}
