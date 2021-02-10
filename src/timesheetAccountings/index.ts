import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import * as responseHandlers from '../utils/response/responseHandlers';
import { TimesheetAccounting } from './types';

export class TimesheetAccountingsEndpoint extends BaseApi {
  public readonly resourceName = 'timesheetAccountings';

  public read(params?: RequestParams<TimesheetAccounting> | Object): Promise<TimesheetAccounting[]> {
    const response = this._get<TimesheetAccounting[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }
  public readById(id: number, params?: RequestParams<TimesheetAccounting> | Object): Promise<TimesheetAccounting> {
    const response = this._get<TimesheetAccounting[]>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandlers.required(response);
  }
}
