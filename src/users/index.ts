import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { resolveAxiosResponse } from '../utils/response/rawApiResponse';
import { createReadRawResponse, ReadRawResponse } from '../utils/response/readRawResponse';
import { createResourceResponse } from '../utils/response/resourceResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import { User } from './types';

export class UsersEndpoint extends BaseApi {
  public readonly resourceName = 'users';

  public read(requestParams?: RequestParams<User> | Object): Promise<User[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<User[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }
  public async readRaw(requestParams: RequestParams<User>): Promise<ReadRawResponse<User>> {
    const params = requestParams.getParams();
    const response = this._get<User[]>(`${this.getResourceName()}/read`, { params });
    return createReadRawResponse<User>(createResourceResponse(await resolveAxiosResponse(response)), requestParams);
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
