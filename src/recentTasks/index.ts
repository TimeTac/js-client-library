import BaseApi from '../baseApi';

const resourceName = 'recentTasks';
type Resource = typeof resourceName;

export class RecentTasksEndpoint extends BaseApi<Resource> {
  public readonly resourceName = resourceName;
}
