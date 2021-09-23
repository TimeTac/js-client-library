import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { LibraryReturn, Resources } from '../utils/response/apiResponse';
import { createRawApiResponse } from '../utils/response/rawApiResponse';
import { createResourceResponse } from '../utils/response/resourceResponse';
import { list, required, Required, requiredSingle } from '../utils/response/responseHandlers';
import { createUpdateRawResponse, UpdateRawResponse } from '../utils/response/updateRawResponse';
import { UserRead, UserCreate, UserResetPassword, UserUpdate, UserUpdatePassword, UserReadMe } from './types';

const resourceName = 'users';
type ResourceName = typeof resourceName;

export class UsersEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = 'users';

  public readMe(params?: RequestParams<UserReadMe>): Required<ResourceName, Resources[ResourceName][]> {
    const response = this._get<ResourceName>('me', { params });
    return required(response);
  }

  public create(data: UserCreate): Required<ResourceName> {
    const response = this._post<ResourceName>('create', data);
    return requiredSingle(response);
  }

  public async update(data: UserUpdate): Promise<UpdateRawResponse<UserRead>> {
    const response = this._put<ResourceName>(`${this.getResourceName()}/update`, data);
    return createUpdateRawResponse<UserRead>(createResourceResponse<UserRead>(await createRawApiResponse(response)));
  }

  //endpoint returns empty array in Results
  public resetPassword(data: UserResetPassword): Promise<LibraryReturn<ResourceName, Resources[ResourceName][]>> {
    const response = this._put<ResourceName>('resetPassword', data);
    return list(response);
  }

  //endpoint returns empty array in Results
  public forgotPassword(data: UserResetPassword): Promise<LibraryReturn<ResourceName, Resources[ResourceName][]>> {
    const response = this._put<ResourceName>('forgotPassword', data);
    return list(response);
  }

  public updatePassword(data: UserUpdatePassword): Promise<LibraryReturn<ResourceName>> {
    const response = this._put<ResourceName>('updatePassword', data);
    return requiredSingle(response);
  }
}
