import BaseApi from '../baseApi';

const resourceName = 'timesheetAccountings';
type ResourceName = typeof resourceName;

export class TimesheetAccountingsEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
}
