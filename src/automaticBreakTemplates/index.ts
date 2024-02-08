import BaseApi from '../baseApi';

const resourceName = 'automaticBreakTemplates';
type ResourceName = typeof resourceName;

export class AutomaticBreakTemplatesEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
}
