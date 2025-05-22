import BaseApi from '../baseApi';

const resourceName = 'paidBreaksHistory';
type ResourceName = typeof resourceName;

export class PaidBreaksHistoryEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
}
