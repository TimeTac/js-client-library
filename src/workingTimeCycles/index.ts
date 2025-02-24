import BaseApi from '../baseApi';

const resourceName = 'workingTimeCycles';
type ResourceName = typeof resourceName;

export class WorkingTimeCyclesEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
}
