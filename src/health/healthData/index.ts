import BaseApi from '../../baseApi';
import { RequestParams } from '../../utils/params/requestParams';
import { Entity, LibraryReturn } from '../../utils/response/apiResponse';
import { list } from '../../utils/response/responseHandlers';

const resourceName = 'healthData';
type ResourceName = typeof resourceName;

export class HealthDataEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public read(params?: RequestParams<Entity<ResourceName>> | string): Promise<LibraryReturn<ResourceName, Entity<ResourceName>[]>> {
    const response = this._get<ResourceName>('read', { params });
    return list(response);
  }
}
