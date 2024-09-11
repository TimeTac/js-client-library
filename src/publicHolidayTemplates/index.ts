import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { Entity, LibraryReturn } from '../utils/response/apiResponse';
import { list, Required, requiredSingle } from '../utils/response/responseHandlers';
import { PublicHolidayTemplatesCreate, PublicHolidayTemplatesUpdate } from './types';

const resourceName = 'publicHolidayTemplates';
type ResourceName = typeof resourceName;
export class PublicHolidayTemplatesEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public create(data: PublicHolidayTemplatesCreate, params?: RequestParams<Entity<ResourceName>>): Required<ResourceName> {
    const response = this._post<ResourceName>('create', data, params);
    return requiredSingle(response);
  }

  public read(
    params?: RequestParams<Entity<typeof resourceName>> | string,
  ): Promise<LibraryReturn<typeof resourceName, Entity<typeof resourceName>[]>> {
    const response = this._get<typeof resourceName>('read', { params });
    return list(response);
  }

  public update(data: PublicHolidayTemplatesUpdate): Promise<LibraryReturn<typeof resourceName, Entity<typeof resourceName>[]>> {
    const response = this._put<typeof resourceName>('update', data);
    return list(response);
  }
}
