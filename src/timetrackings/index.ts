import BaseApi from '../baseApi';
import { TimeTracking, StartTimeTrackingData, StopTimeTrackingData } from './types';
import responseHandler from '../utils/responseHandlers';
import { AxiosRequestConfig } from 'axios';
import { ReadOptions } from '../utils/types';

export default class TimeTrackings extends BaseApi {
  static resourceName = 'timeTrackings';

  read(id: number, options: ReadOptions = {}) {
    const axiosConfig: AxiosRequestConfig = {
      params: options,
    };
    const response = this._get<TimeTracking>(`${TimeTrackings.resourceName}/read/${id}`, axiosConfig);
    return responseHandler.requiredList(response);
  }
  readAll(options: ReadOptions = {}) {
    const axiosConfig: AxiosRequestConfig = {
      params: options,
    };
    const response = this._get<TimeTracking>(`${TimeTrackings.resourceName}/read`, axiosConfig);
    return responseHandler.requiredList(response);
  }
  create(data: TimeTracking) {
    const response = this._post<TimeTracking>(`${TimeTrackings.resourceName}/create`, data);
    return responseHandler.requiredList(response);
  }
  update(data: TimeTracking) {
    const response = this._put<TimeTracking>(`${TimeTrackings.resourceName}/update`, data);
    return responseHandler.requiredList(response);
  }
  delete(id: number) {
    const response = this._delete<TimeTracking>(`${TimeTrackings.resourceName}/delete/${id}`);
    return responseHandler.requiredList(response);
  }
  start(data: StartTimeTrackingData): Promise<TimeTracking> {
    const response = this._post<TimeTracking>(`${TimeTrackings.resourceName}/start`, data);
    return responseHandler.required(response);
  }
  stop(data: StopTimeTrackingData): Promise<TimeTracking> {
    const response = this._put<TimeTracking>(`${TimeTrackings.resourceName}/stop`, data);
    return responseHandler.required(response);
  }
}
