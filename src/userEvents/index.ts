import BaseApi from '../baseApi';
import { Entity } from '../utils/response/apiResponse';
import { RequestParams } from '../utils/params/requestParams';
import { Required, requiredSingle } from '../utils/response/responseHandlers';
import { UserEvent } from './types';

const resourceName = 'userEvents';
type ResourceName = typeof resourceName;

export class UserEventsEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public create(data: UserEvent, params?: RequestParams<Entity<ResourceName>>): Required<ResourceName> {
    const response = this._post<ResourceName>('create', data, params);
    return requiredSingle(response);
  }
}
