import BaseApi from '../baseApi';

const resourceName = 'clients';
type ResourceName = typeof resourceName;

export class ClientsEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
}
