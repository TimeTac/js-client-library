import BaseApi from '../baseApi';

const resourceName = 'workingHourTemplateHistory';
type ResourceName = typeof resourceName;

export class WorkingHourTemplateHistoryEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
}
