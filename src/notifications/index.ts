import BaseApi from '../baseApi';
import { Entity, LibraryReturn } from '../utils/response/apiResponse';
import { ParsedErrorMesage, required, Required, requiredBatch, requiredSingle } from '../utils/response/responseHandlers';
import { RequestParams } from '../utils/params/requestParams';
import { NotificationUpdate, Notification } from './types';

const resourceName = 'notifications';
type ResourceName = typeof resourceName;

export class NotificationsEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public async update(data: NotificationUpdate[]): Required<typeof resourceName, (ParsedErrorMesage | Notification)[]>;

  public async update(data: NotificationUpdate): Required<ResourceName>;

  public async update(
    data: NotificationUpdate | NotificationUpdate[],
  ): Promise<LibraryReturn<'notifications', Notification> | LibraryReturn<'notifications', (ParsedErrorMesage | Notification)[]>>;

  public async update(
    data: NotificationUpdate | NotificationUpdate[],
    params?: RequestParams<Entity<ResourceName>>,
  ): Promise<LibraryReturn<'notifications', Notification> | LibraryReturn<'notifications', (ParsedErrorMesage | Notification)[]>> {
    if (Array.isArray(data)) {
      const response = this._putBatch<ResourceName>('update', data, params);
      return requiredBatch(response);
    } else {
      const response = this._put<ResourceName>('update', data, params);
      return requiredSingle(response);
    }
  }
}
