import BaseApi from '../baseApi';
import { RequestConfig } from '../utils/configs/requestConfig';
import * as responseHandlers from '../utils/response/responseHandlers';
import { TimesheetAccounting } from './types';

export class TimesheetAccountingsEndpoint extends BaseApi {
  public readonly resourceName = 'timesheetAccountings';

  public read(config?: RequestConfig<TimesheetAccounting>): Promise<TimesheetAccounting[]> {
    const response = this._get<TimesheetAccounting[]>(`${this.getResourceName()}/read`, config);
    return responseHandlers.list(response);
  }
  public readById(id: number, config?: RequestConfig<TimesheetAccounting>): Promise<TimesheetAccounting> {
    const response = this._get<TimesheetAccounting[]>(`${this.getResourceName()}/read/${id}`, config);
    return responseHandlers.required(response);
  }
}
