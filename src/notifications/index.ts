import BaseApi from '../baseApi';
import { Entity } from '../utils/response/apiResponse';
import { required, Required } from '../utils/response/responseHandlers';
import { RequestParams } from '../utils/params/requestParams';
import { NotificationUpdate } from './types';

const resourceName = 'notifications';
type ResourceName = typeof resourceName;

export class NotificationsEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public update(data: NotificationUpdate, params?: RequestParams<Entity<ResourceName>>): Required<ResourceName, Entity<ResourceName>[]> {
    const response = this._put<ResourceName>('update', data, params);
    return required(response);
  }
}
