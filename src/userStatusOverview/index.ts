import BaseApi from '../baseApi';

const resourceName = 'userStatusOverview';
type ResourceName = typeof resourceName;

export class UserStatusOverviewsEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
}
