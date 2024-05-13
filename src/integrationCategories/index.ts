import { Entity, LibraryReturn } from '../utils/response/apiResponse';
import { list } from '../utils/response/responseHandlers';
import { RequestParams } from '../utils/params/requestParams';
import BaseApi from '../baseApi';

const resourceName = 'integrationCategories';
type ResourceName = typeof resourceName;

export class IntegrationCategoriesEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public read(
    params?: RequestParams<Entity<typeof resourceName>> | string,
  ): Promise<LibraryReturn<typeof resourceName, Entity<typeof resourceName>[]>> {
    const response = this._get<typeof resourceName>('read', { params });
    return list(response);
  }
}
