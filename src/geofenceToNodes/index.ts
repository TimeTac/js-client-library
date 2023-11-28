import BaseApi from '../baseApi';
import { Entity, LibraryReturn, Resources } from '../utils/response/apiResponse';
import { RequestParams } from '../utils/params/requestParams';
import { list, ParsedErrorMesage, required, Required, requiredBatch, requiredSingle } from '../utils/response/responseHandlers';
import { GeofenceToNodes, GeofenceToNodesCreate, GeofenceToNodesUpdate } from './types';

const resourceName = 'geofenceToNodes';
type ResourceName = typeof resourceName;

export class GeofenceToNodesEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public read(
    params?: RequestParams<Entity<typeof resourceName>> | string,
  ): Promise<LibraryReturn<typeof resourceName, Entity<typeof resourceName>[]>> {
    const response = this._get<typeof resourceName>('read', { params });
    return list(response);
  }

  public create(
    data: GeofenceToNodesCreate | GeofenceToNodesCreate[],
    params?: RequestParams<Entity<ResourceName>>,
  ): Promise<LibraryReturn<'geofenceToNodes'>> | Required<'geofenceToNodes', (GeofenceToNodes | ParsedErrorMesage)[]> {
    if (Array.isArray(data)) {
      const response = this._postBatch<ResourceName>('create', data, params);
      return requiredBatch(response);
    }
    const response = this._post<ResourceName>('create', data, params);
    return requiredSingle(response);
  }

  public update(
    data: GeofenceToNodesUpdate,
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
