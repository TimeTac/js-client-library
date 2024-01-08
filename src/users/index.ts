import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { NonEntityResult, Entity, LibraryReturn } from '../utils/response/apiResponse';
import { nonEntityResult, list, ParsedErrorMesage, Required, requiredBatch, requiredSingle } from '../utils/response/responseHandlers';
import {
  UserCreate,
  UserResetPassword,
  UserUpdate,
  UserUpdatePassword,
  UserReadMe,
  UserRead,
  UserValidatePassword,
  UserCreateLoginLink,
  ReturnUserCreateLoginLink,
} from './types';

const resourceName = 'users';
const usersReadMe = 'usersReadMe';
type ResourceName = typeof resourceName;

export class UsersEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = 'users';

  public readMe(params?: RequestParams<UserReadMe>): Required<typeof usersReadMe> {
    const response = this._get<typeof usersReadMe>('me', { params });
    return requiredSingle(response);
  }

  public create(data: UserCreate, params?: RequestParams<Entity<ResourceName>>): Required<ResourceName> {
    const response = this._post<ResourceName>('create', data, params);
    return requiredSingle(response);
  }

  public async update(data: UserUpdate[]): Required<typeof resourceName, (ParsedErrorMesage | UserRead)[]>;
  public async update(data: UserUpdate): Required<ResourceName>;
  public async update(
    data: UserUpdate | UserUpdate[],
  ): Promise<LibraryReturn<'users', UserRead> | LibraryReturn<'users', (ParsedErrorMesage | UserRead)[]>>;

  public async update(
    data: UserUpdate | UserUpdate[],
  ): Promise<LibraryReturn<'users', UserRead> | LibraryReturn<'users', (ParsedErrorMesage | UserRead)[]>> {
    if (Array.isArray(data)) {
      const response = this._putBatch<ResourceName>('update', data);
      return requiredBatch(response);
    } else {
      const response = this._put<ResourceName>('update', data);
      return requiredSingle(response);
    }
  }

  //endpoint returns empty array in Results
  public resetPassword(data: UserResetPassword): Promise<LibraryReturn<ResourceName, Entity<ResourceName>[]>> {
    const response = this._put<ResourceName>('resetPassword', data);
    return list(response);
  }

  //endpoint returns empty array in Results
  public forgotPassword(data: UserResetPassword): Promise<LibraryReturn<ResourceName, Entity<ResourceName>[]>> {
    const response = this._put<ResourceName>('forgotPassword', data);
    return list(response);
  }

  public updatePassword(data: UserUpdatePassword): Promise<LibraryReturn<ResourceName>> {
    const response = this._put<ResourceName>('updatePassword', data);
    return requiredSingle(response);
  }

  public validatePassword(data: UserValidatePassword): Promise<NonEntityResult<{ password_valid: boolean }>> {
    const response = this._post<ResourceName>(`validatePassword`, data);
    return nonEntityResult(response);
  }

  public createLoginLink(data: UserCreateLoginLink): Promise<NonEntityResult<ReturnUserCreateLoginLink>> {
    const response = this._post<ResourceName>(`createLoginLink`, data);
    return nonEntityResult(response);
  }
}
