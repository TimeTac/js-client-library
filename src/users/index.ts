import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { createRawApiResponse } from '../utils/response/rawApiResponse';
import { createReadRawResponse, ReadRawResponse } from '../utils/response/readRawResponse';
import { createResourceResponse } from '../utils/response/resourceResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import { createUpdateRawResponse, UpdateRawResponse } from '../utils/response/updateRawResponse';
import { UserRead, UserCreate, UserResetPassword, UserUpdate, UserUpdatePassword, UserReadMe } from './types';

export class UsersEndpoint extends BaseApi {
  public readonly resourceName = 'users';

  public read(params?: RequestParams<UserRead>): Promise<UserRead[]> {
    const response = this._get<UserRead[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }
  public async readRaw(params: RequestParams<UserRead>): Promise<ReadRawResponse<UserRead>> {
    const response = this._get<UserRead[]>(`${this.getResourceName()}/read`, { params });
    return createReadRawResponse<UserRead>(createResourceResponse(await createRawApiResponse(response)), params);
  }
  public readById(id: number, params?: RequestParams<UserRead>): Promise<UserRead> {
    const response = this._get<UserRead[]>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandlers.required(response);
  }

  public readMe(params?: RequestParams<UserReadMe>): Promise<UserReadMe> {
    const response = this._get<UserReadMe[]>(`${this.getResourceName()}/me`, { params });
    return responseHandlers.required(response);
  }

  public create(data: UserCreate): Promise<UserRead> {
    const response = this._post<UserRead[]>(`${this.getResourceName()}/create`, data);
    return responseHandlers.required(response);
  }

  public async update(data: UserUpdate): Promise<UpdateRawResponse<UserRead>> {
    const response = this._put<UserRead[]>(`${this.getResourceName()}/update`, data);
    return createUpdateRawResponse<UserRead>(createResourceResponse<UserRead>(await createRawApiResponse(response)));
  }

  //endpoint returns empty array in Results
  public resetPassword(data: UserResetPassword): Promise<UserRead[]> {
    const response = this._put<UserRead[]>(`${this.getResourceName()}/resetPassword`, data);
    return responseHandlers.list(response);
  }

  //endpoint returns empty array in Results
  public forgotPassword(data: UserResetPassword): Promise<UserRead[]> {
    const response = this._put<UserRead[]>(`${this.getResourceName()}/forgotPassword`, data);
    return responseHandlers.list(response);
  }

  public updatePassword(data: UserUpdatePassword): Promise<UserRead[]> {
    const response = this._put<UserRead[]>(`${this.getResourceName()}/updatePassword`, data);
    return responseHandlers.requiredSingle(response);
  }
}
