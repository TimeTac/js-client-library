import BaseApi from '../baseApi';

const resourceName = 'teamMembers';
type ResourceName = typeof resourceName;

export class TeamMembersEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
}
