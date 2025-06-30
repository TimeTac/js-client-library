import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { Entity, LibraryReturn } from '../utils/response/apiResponse';
import { list } from '../utils/response/responseHandlers';

const resourceName = 'userTemplateHistory';
type ResourceName = typeof resourceName;

export class UserTemplateHistoryEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public view(params?: RequestParams<{ user_id: number }>): Promise<LibraryReturn<typeof resourceName, Entity<typeof resourceName>[]>> {
    const response = this._get<ResourceName>('view', { params });
    return list(response);
  }

  public readHistory(params?: RequestParams<Entity<ResourceName>>): Promise<LibraryReturn<ResourceName, Entity<ResourceName>[]>> {
    const response = this._get<ResourceName>('read', { params });
    return list(response);
  }
}
