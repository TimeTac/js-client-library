import BaseApi from '../baseApi';

const resourceName = 'teams';
type ResourceName = typeof resourceName;

export class TeamsEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
}
