import BaseApi from '../baseApi';

const resourceName = 'userTemplateHistory';
type ResourceName = typeof resourceName;

export class UserTemplateHistoryEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
}
