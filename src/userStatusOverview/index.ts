import BaseApi from '../baseApi';

const resourceName = 'userStatusOverview';
type ResourceName = typeof resourceName;

export class UserStatusOverviewEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
}
