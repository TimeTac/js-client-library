import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { Entity, LibraryReturn, Resources } from '../utils/response/apiResponse';
import { list, required, Required, requiredSingle } from '../utils/response/responseHandlers';
import { GeofenceCreate, GeofenceUpdate } from './types';

const resourceName = 'geofences';
type ResourceName = typeof resourceName;

export class GeofenceEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
  public read(
    params?: RequestParams<Entity<typeof resourceName>> | string,
  ): Promise<LibraryReturn<typeof resourceName, Entity<typeof resourceName>[]>> {
    const response = this._get<typeof resourceName>('read', { params });
    return list(response);
  }

  public create(data: GeofenceCreate, params?: RequestParams<Entity<ResourceName>>): Required<ResourceName> {
    const response = this._post<ResourceName>('create', data, params);
    return requiredSingle(response);
  }

  public update(
    data: GeofenceUpdate,
    params?: RequestParams<Entity<ResourceName>>,
  ): Required<typeof resourceName, Resources[typeof resourceName][]> {
    const response = this._put<ResourceName>('update', data, params);
    return required(response);
  }

  public delete(id: number): Promise<LibraryReturn<typeof resourceName>> {
    const response = this._delete<typeof resourceName>(`delete`, { params: { id } });
    return requiredSingle(response);
  }
}
