import BaseApi from '../baseApi';

const resourceName = 'userHistory';
type ResourceName = typeof resourceName;

export class UserHistoryEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
}
