import BaseApi from '../../baseApi';

const resourceName = 'permissionResolveDepartments';
type ResourceName = typeof resourceName;

export class PermissionResolveDepartmentsEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
}
