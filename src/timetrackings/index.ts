import BaseApi from '../baseApi';
import { TimeTracking, StartTimeTrackingData, StopTimeTrackingData } from './types';
import responseHandler from '../utils/responseHandlers';
import { AxiosRequestConfig } from 'axios';
import { ReadParams } from '../utils/types';
import { TimesheetAccounting } from '..';

export default class TimeTrackings extends BaseApi {
  static resourceName = 'timeTrackings';

  public read(options: ReadParams = {}): Promise<TimesheetAccounting[]> {
    const axiosConfig: AxiosRequestConfig = {
      params: options,
    };
    const response = this._get<TimeTracking>(`${TimeTrackings.resourceName}/read`, axiosConfig);
    return responseHandler.requiredList(response);
  }
  public readById(id: number, options: ReadParams = {}): Promise<TimesheetAccounting[]> {
    const axiosConfig: AxiosRequestConfig = {
      params: { ...options, id },
    };
    const response = this._get<TimeTracking>(`${TimeTrackings.resourceName}/read`, axiosConfig);
    return responseHandler.required(response);
  }
  public create(data: TimeTracking) {
    const response = this._post<TimeTracking>(`${TimeTrackings.resourceName}/create`, data);
    return responseHandler.requiredList(response);
  }
  public update(data: TimeTracking) {
    const response = this._put<TimeTracking>(`${TimeTrackings.resourceName}/update`, data);
    return responseHandler.requiredList(response);
  }
  public delete(id: number) {
    const response = this._delete<TimeTracking>(`${TimeTrackings.resourceName}/delete/${id}`);
    return responseHandler.requiredList(response);
  }
  public start(data: StartTimeTrackingData): Promise<TimeTracking> {
    const response = this._post<TimeTracking>(`${TimeTrackings.resourceName}/start`, data);
    return responseHandler.required(response);
  }
  public stop(data: StopTimeTrackingData): Promise<TimeTracking> {
    const response = this._put<TimeTracking>(`${TimeTrackings.resourceName}/stop`, data);
    return responseHandler.required(response);
  }
}
