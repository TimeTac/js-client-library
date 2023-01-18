import BaseApi from '../../baseApi';

const resourceName = 'permissionResolveAbsenceTypesAndUsers';
type ResourceName = typeof resourceName;

export class PermissionResolveAbsenceTypesAndUsersEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
}
