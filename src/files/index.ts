import BaseApi from '../baseApi';

const resourceName = 'files';
type ResourceName = typeof resourceName;

export class FilesEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
}
