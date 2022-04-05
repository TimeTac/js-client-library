import BaseApi from '../baseApi';

const resourceName = 'salutations';
type ResourceName = typeof resourceName;

export class SalutationsEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
}
