import BaseApi from '../baseApi';

const resourceName = 'workingTimeBalanceRules';
type ResourceName = typeof resourceName;

export class WorkingTimeBalanceRulesEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
}
