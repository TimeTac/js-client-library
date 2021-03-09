import BaseApi from '../baseApi';
import { RequestConfig } from '../utils/configs/requestConfig';
import { createRawApiResponse } from '../utils/response/rawApiResponse';
import { createReadRawResponse, ReadRawResponse } from '../utils/response/readRawResponse';
import { createResourceResponse } from '../utils/response/resourceResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import { createUpdateRawResponse, UpdateRawResponse } from '../utils/response/updateRawResponse';
import { User, UserUpdate } from './types';

export class UsersEndpoint extends BaseApi {
  public readonly resourceName = 'users';

  public read(config?: RequestConfig<User>): Promise<User[]> {
    const response = this._get<User[]>(`${this.getResourceName()}/read`, config);
    return responseHandlers.list(response);
  }
  public async readRaw(config: RequestConfig<User>): Promise<ReadRawResponse<User>> {
    const response = this._get<User[]>(`${this.getResourceName()}/read`, config);
    return createReadRawResponse<User>(createResourceResponse(await createRawApiResponse(response)), config);
  }
  public readById(id: number, config?: RequestConfig<User>): Promise<User> {
    const response = this._get<User[]>(`${this.getResourceName()}/read/${id}`, config);
    return responseHandlers.required(response);
  }

  public readMe(config?: RequestConfig<User>): Promise<User> {
    const response = this._get<User[]>(`${this.getResourceName()}/me`, config);
    return responseHandlers.required(response);
  }

  public create(): Promise<User> {
    throw new Error('not Implemented');
  }

  public async update(data: UserUpdate): Promise<UpdateRawResponse<User>> {
    const response = this._put<User[]>(`${this.getResourceName()}/update`, data);
    return createUpdateRawResponse<User>(createResourceResponse<User>(await createRawApiResponse(response)));
  }
}
