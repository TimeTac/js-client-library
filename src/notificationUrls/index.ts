import BaseApi from '../baseApi';

const resourceName = 'notificationUrls';
type ResourceName = typeof resourceName;

export class NotificationUrlsEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
}
