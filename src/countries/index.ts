import BaseApi from '../baseApi';

const resourceName = 'countries';
type ResourceName = typeof resourceName;

export class CountriesEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
}
