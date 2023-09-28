import BaseApi from '../baseApi';

const resourceName = 'languages';
type ResourceName = typeof resourceName;

export class LanguagesEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
}
