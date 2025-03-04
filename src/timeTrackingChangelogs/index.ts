import BaseApi from '../baseApi';

const resourceName = 'timeTrackingChangelogs';
type ResourceName = typeof resourceName;

export class TimeTrackingChangelogsEndPoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
}
