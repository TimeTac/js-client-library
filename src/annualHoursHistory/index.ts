import BaseApi from '../baseApi';

const resourceName = 'annualHoursHistory';
type ResourceName = typeof resourceName;

export class AnnualHoursHistoryEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
}
