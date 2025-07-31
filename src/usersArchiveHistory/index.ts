import BaseApi from '../baseApi';

const resourceName = 'usersArchiveHistory';

type ResourceName = typeof resourceName;

export class UsersArchiveHistoryEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
}
