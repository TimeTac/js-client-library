import BaseApi from '../baseApi';

const resourceName = 'notificationsTypeHtml';
type ResourceName = typeof resourceName;

export class NotificationsTypeHtmlEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
}
