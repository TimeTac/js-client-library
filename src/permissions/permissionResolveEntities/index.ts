import BaseApi from '../../baseApi';

const resourceName = 'permissionResolveEntities';
type ResourceName = typeof resourceName;

export class PermissionResolveEntitiesEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
}
