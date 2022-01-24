import BaseApi from '../../baseApi';

const resourceName = 'permissionResolveUsers';
type ResourceName = typeof resourceName;

export class PermissionResolveUsersEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
}
