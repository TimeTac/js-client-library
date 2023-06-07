import BaseApi from '../baseApi';

const resourceName = 'publicHolidayTemplates';
type ResourceName = typeof resourceName;
export class PublicHolidayTemplatesEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
}
