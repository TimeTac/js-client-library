import BaseApi from '../baseApi';
import { list } from '../utils/response/responseHandlers';
import { Entity, LibraryReturn } from '../utils/response/apiResponse';
import { RequestParams } from '../utils/params/requestParams';

const resourceName = 'hourTypes';
// type ResourceName = typeof resourceName;

export class HourTypesEndpoint extends BaseApi<'hourTypes'> {
  public readonly resourceName = resourceName;

  public read(
    params?: RequestParams<Entity<typeof resourceName>> | string,
  ): Promise<LibraryReturn<typeof resourceName, Entity<typeof resourceName>[]>> {
    const response = this._get<typeof resourceName>('read', { params });
    return list(response);
  }

  // public update(
  //   data: AbsenceBanUpdate,
  //   params?: RequestParams<Entity<ResourceName>>,
  // ): Required<typeof resourceName, Resources[typeof resourceName][]> {
  //   const response = this._put<typeof resourceName>('update', data, params);
  //   return required(response);
  // }
}
