import BaseApi from '../baseApi';
import RequestParams from '../utils/requestParams/requestParams';
import { TimesheetAccounting } from './types';
import { required, requiredList } from '../utils/response/responseHandlers';

export default class TimesheetAccountings extends BaseApi {
  public readonly resourceName = 'timesheetAccountings';

  public read(requestParams?: RequestParams<TimesheetAccounting> | Object): Promise<TimesheetAccounting[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<TimesheetAccounting[]>(`${this.getResourceName()}/read`, { params });
    return requiredList(response);
  }
  public readById(id: number, requestParams?: RequestParams<TimesheetAccounting> | Object): Promise<TimesheetAccounting> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<TimesheetAccounting[]>(`${this.getResourceName()}/read/${id}`, { params });
    return required(response);
  }
}
