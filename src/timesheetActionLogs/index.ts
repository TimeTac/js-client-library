import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { Entity, LibraryReturn } from '../utils/response/apiResponse';
import { list } from '../utils/response/responseHandlers';

const resourceName = 'timesheetActionLogs';
type ResourceName = typeof resourceName;

export class TimesheetActionLogsEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public read(
    params?: RequestParams<Entity<typeof resourceName>> | string,
  ): Promise<LibraryReturn<typeof resourceName, Entity<typeof resourceName>[]>> {
    const response = this._get<typeof resourceName>('read', { params });
    return list(response);
  }
}
