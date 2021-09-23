import BaseApi from '../baseApi';

const resourceName = 'timePlannings';
type ResourceName = typeof resourceName;

export class TimePlanningsEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
}
