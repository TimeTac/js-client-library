import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import RequestParams from '../utils/requestParams';
import { TimesheetAccounting } from './types';

export default class TimesheetAccountings extends BaseApi {
  public readonly resourceName = 'timesheetAccountings';

  public read(requestParams?: RequestParams<TimesheetAccounting> | Object): Promise<TimesheetAccounting[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<TimesheetAccounting[]>(`${this.getResourceName()}/read`, { params });
    return responseHandler.requiredList(response);
  }
  public readById(id: number, requestParams?: RequestParams<TimesheetAccounting> | Object): Promise<TimesheetAccounting[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<TimesheetAccounting[]>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandler.required(response);
  }
}
