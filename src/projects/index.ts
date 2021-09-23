import BaseApi from '../baseApi';

const resourceName = 'projects';
type ResourceName = typeof resourceName;

export class ProjectsEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
}
