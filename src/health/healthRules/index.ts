import BaseApi from '../../baseApi';

const resourceName = 'healthRules';
type ResourceName = typeof resourceName;

export class HealthRulesEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
}
