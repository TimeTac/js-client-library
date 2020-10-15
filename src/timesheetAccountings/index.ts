import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import { TimesheetAccounting } from './types';
import { ReadParams } from '../utils/types';
import { AxiosRequestConfig } from 'axios';

export default class TimesheetAccountings extends BaseApi {
  static resourceName = 'timesheetAccountings';

  public read(options: ReadParams = {}): Promise<TimesheetAccounting[]> {
    const axiosConfig: AxiosRequestConfig = {
      params: options,
    };
    const response = this._get<TimesheetAccounting[]>(`${TimesheetAccountings.resourceName}/read`, axiosConfig);
    return responseHandler.requiredList(response);
  }
  public readById(id: number, options: ReadParams = {}): Promise<TimesheetAccounting[]> {
    const axiosConfig: AxiosRequestConfig = {
      params: { ...options, id },
    };
    const response = this._get<TimesheetAccounting[]>(`${TimesheetAccountings.resourceName}/read`, axiosConfig);
    return responseHandler.required(response);
  }
}
