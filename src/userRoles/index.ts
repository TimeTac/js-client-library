import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { Entity, LibraryReturn } from '../utils/response/apiResponse';
import { optional } from '../utils/response/responseHandlers';
import { UserRoleSet } from './types';

const resourceName = 'userRoles';
type ResourceName = typeof resourceName;

export class UserRolesEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public set(
    data: UserRoleSet,
    params?: RequestParams<Entity<ResourceName>>,
  ): Promise<LibraryReturn<ResourceName, Entity<ResourceName> | undefined>> {
    const response = this._post<ResourceName>('set', data, params);
    return optional(response);
  }
}
