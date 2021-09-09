import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import * as responseHandlers from '../utils/response/responseHandlers';
import { TimesheetAccountingSummaries, TimesheetAccountingSummariesRead } from './types';

export class TimesheetAccountingSummariesEndpoint extends BaseApi {
  public readonly resourceName = 'timesheetAccountingSummaries';

  public read(params: RequestParams<TimesheetAccountingSummariesRead>): Promise<TimesheetAccountingSummaries> {
    const response = this._get<TimesheetAccountingSummaries[]>(`${this.getResourceName()}/read/`, { params });
    return responseHandlers.required(response);
  }
}
