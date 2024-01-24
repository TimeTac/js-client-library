import BaseApi from '../baseApi';
import { list, Required, requiredSingle } from '../utils/response/responseHandlers';
import { Entity, LibraryReturn } from '../utils/response/apiResponse';
import { RequestParams } from '../utils/params/requestParams';
import { SsoConfig, SsoConfigCreate, SsoConfigUpdate } from './types';

const resourceName = 'ssoConfig';

export class SsoConfigEndpoint extends BaseApi<'ssoConfig'> {
  public readonly resourceName = resourceName;

  public create(data: SsoConfigCreate): Required<typeof resourceName> {
    const response = this._post<typeof resourceName>('create', data);
    return requiredSingle(response);
  }

  public update(data: SsoConfigUpdate): Required<typeof resourceName, SsoConfig> {
    const response = this._put<typeof resourceName>('update', data);
    return requiredSingle(response);
  }

  public read(
    params?: RequestParams<Entity<typeof resourceName>> | string,
  ): Promise<LibraryReturn<typeof resourceName, Entity<typeof resourceName>[]>> {
    const response = this._get<typeof resourceName>('read', { params });
    return list(response);
  }

  public delete(id: number): Promise<LibraryReturn<typeof resourceName>> {
    const response = this._delete<typeof resourceName>(`delete`, { params: { id } });
    return requiredSingle(response);
  }
}
