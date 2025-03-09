import BaseApi from '../baseApi';
import { list, Required, requiredSingle } from '../utils/response/responseHandlers';
import { Entity, LibraryReturn } from '../utils/response/apiResponse';
import { RequestParams } from '../utils/params/requestParams';
import { UserPreferenceRead, UserPreferenceSet, UserPreferenceUpdate } from './types';

const resourceName = 'userPreferences';
type ResourceName = typeof resourceName;

export class UserPreferencesEndpoint extends BaseApi<'userPreferences'> {
  public readonly resourceName = resourceName;

  public set(data: UserPreferenceSet[]): Promise<LibraryReturn<ResourceName, Entity<ResourceName>[]>> {
    const response = this._post<typeof resourceName>('set', { data });
    return list(response);
  }

  public update(data: UserPreferenceUpdate): Required<typeof resourceName, UserPreferenceRead> {
    const response = this._put<typeof resourceName>('update', data);
    return requiredSingle(response);
  }

  public read(
    params?: RequestParams<Entity<typeof resourceName>> | string,
  ): Promise<LibraryReturn<typeof resourceName, Entity<typeof resourceName>[]>> {
    const response = this._get<typeof resourceName>('read', { params });
    return list(response);
  }
}
