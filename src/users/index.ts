import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { createRawApiResponse } from '../utils/response/rawApiResponse';
import { createReadRawResponse, ReadRawResponse } from '../utils/response/readRawResponse';
import { createResourceResponse } from '../utils/response/resourceResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import { createUpdateRawResponse, UpdateRawResponse } from '../utils/response/updateRawResponse';
import { User, UserResetPassword, UserUpdate, UserUpdatePassword } from './types';

export class UsersEndpoint extends BaseApi {
  public readonly resourceName = 'users';

  public read(params?: RequestParams<User>): Promise<User[]> {
    const response = this._get<User[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }
  public async readRaw(params: RequestParams<User>): Promise<ReadRawResponse<User>> {
    const response = this._get<User[]>(`${this.getResourceName()}/read`, { params });
    return createReadRawResponse<User>(createResourceResponse(await createRawApiResponse(response)), params);
  }
  public readById(id: number, params?: RequestParams<User>): Promise<User> {
    const response = this._get<User[]>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandlers.required(response);
  }

  public readMe(params?: RequestParams<User>): Promise<User> {
    const response = this._get<User[]>(`${this.getResourceName()}/me`, { params });
    return responseHandlers.required(response);
  }

  public create(): Promise<User> {
    throw new Error('not Implemented');
  }

  public async update(data: UserUpdate): Promise<UpdateRawResponse<User>> {
    const response = this._put<User[]>(`${this.getResourceName()}/update`, data);
    return createUpdateRawResponse<User>(createResourceResponse<User>(await createRawApiResponse(response)));
  }

  //endpoint returns empty array in Results
  public resetPassword(data: UserResetPassword): Promise<User[]> {
    const response = this._put<User[]>(`${this.getResourceName()}/resetPassword`, data);
    return responseHandlers.list(response);
  }

  //endpoint returns empty array in Results
  public forgotPassword(data: UserResetPassword): Promise<User[]> {
    const response = this._put<User[]>(`${this.getResourceName()}/forgotPassword`, data);
    return responseHandlers.list(response);
  }

  public updatePassword(data: UserUpdatePassword): Promise<User[]> {
    const response = this._put<User[]>(`${this.getResourceName()}/updatePassword`, data);
    return responseHandlers.requiredSingle(response);
  }
}
