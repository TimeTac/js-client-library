import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { LibraryReturn } from '../utils/response/apiResponse';
import { requiredSingle } from '../utils/response/responseHandlers';
import { TimesheetAccountingSummaries, TimesheetAccountingSummariesRead } from './types';

const resourceName = 'timesheetAccountingSummaries';
type ResourceName = typeof resourceName;

export class TimesheetAccountingSummariesEndpoint extends BaseApi<'timesheetAccountingSummaries'> {
  public readonly resourceName = 'timesheetAccountingSummaries';

  public readTimesheetAccountingSummaries(
    params?: RequestParams<TimesheetAccountingSummariesRead> | string
  ): Promise<LibraryReturn<ResourceName, TimesheetAccountingSummaries>> {
    const response = this._get<ResourceName>('read', { params });
    return requiredSingle(response);
  }
}
