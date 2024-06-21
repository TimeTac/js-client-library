import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { Entity, LibraryReturn, Resources } from '../utils/response/apiResponse';
import { Required, list, required, requiredSingle } from '../utils/response/responseHandlers';
import { PublicHolidays, PublicHolidaysCreate, PublicHolidaysUpdate } from './types';

const resourceName = 'publicHolidays';
type ResourceName = typeof resourceName;
export class PublicHolidaysEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public read(
    params?: RequestParams<Entity<typeof resourceName>> | string,
  ): Promise<LibraryReturn<typeof resourceName, Entity<typeof resourceName>[]>> {
    const response = this._get<typeof resourceName>('read', { params });
    return list(response);
  }

  public create(data: PublicHolidaysCreate): Required<typeof resourceName, Resources[typeof resourceName][]> {
    const response = this._post<typeof resourceName>('create', data);
    return required(response);
  }

  public update(data: PublicHolidaysUpdate): Required<typeof resourceName, Resources[typeof resourceName][]> {
    const response = this._put<ResourceName>('update', data);
    return required(response);
  }

  public delete(id: number): Promise<LibraryReturn<typeof resourceName>> {
    const response = this._delete<ResourceName>('delete', { params: { id } });
    return requiredSingle(response);
  }
}
