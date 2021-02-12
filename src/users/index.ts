import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { ApiResponseWithPages, createApiResponseWithPages } from '../utils/response/apiResponseWithPages';
import * as responseHandlers from '../utils/response/responseHandlers';
import { User } from './types';

export class UsersEndpoint extends BaseApi {
  public readonly resourceName = 'users';

  public read(params?: RequestParams<User>): Promise<User[]> {
    const response = this._get<User>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }
  public async readRaw(params: RequestParams<User>): Promise<ApiResponseWithPages<User>> {
    const response = (await this._get<User>(`${this.getResourceName()}/read`, { params })).data;
    return createApiResponseWithPages(response, params);
  }
  public readById(id: number, params?: RequestParams<User>): Promise<User> {
    const response = this._get<User>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandlers.required(response);
  }

  public readMe(params?: RequestParams<User>): Promise<User> {
    const response = this._get<User>(`/me`, { params });
    return responseHandlers.required(response);
  }

  public create(): Promise<User> {
    throw new Error('not Implemented');
  }

  public update(): Promise<User> {
    throw new Error('not Implemented');
  }
}
