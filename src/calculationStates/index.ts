import BaseApi from '../baseApi';

const resourceName = 'calculationStates';
type ResourceName = typeof resourceName;

export class CalculationStatesEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
}
