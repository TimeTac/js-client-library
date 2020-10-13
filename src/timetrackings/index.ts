import BaseApi from '../baseApi';
import { TimeTracking, StartTimeTrackingData, StopTimeTrackingData } from './types';
import responseHandler from '../utils/responseHandlers';
import { AxiosRequestConfig } from 'axios';
import { ReadOptions } from '../utils/types';

const resourceName = 'timetrackings';

export default class TimeTrackings extends BaseApi {
  read(id: number, options: ReadOptions = {}) {
    const axiosConfig: AxiosRequestConfig = {
      params: options,
    };
    const response = this._get<TimeTracking>(`${resourceName}/read/${id}`, axiosConfig);
    return responseHandler.requiredList(response);
  }
  readAll(options: ReadOptions = {}) {
    const axiosConfig: AxiosRequestConfig = {
      params: options,
    };
    const response = this._get<TimeTracking>(`${resourceName}/read`, axiosConfig);
    return responseHandler.requiredList(response);
  }
  create(data: TimeTracking) {
    const response = this._post<TimeTracking>(`${resourceName}/create`, data);
    return responseHandler.requiredList(response);
  }
  update(data: TimeTracking) {
    const response = this._put<TimeTracking>(`${resourceName}/update`, data);
    return responseHandler.requiredList(response);
  }
  delete(id: number) {
    const response = this._delete<TimeTracking>(`${resourceName}/delete/${id}`);
    return responseHandler.requiredList(response);
  }
  start(data: StartTimeTrackingData): Promise<TimeTracking> {
    const response = this._post<TimeTracking>(`${resourceName}/start`, data);
    return responseHandler.required(response);
  }
  stop(data: StopTimeTrackingData): Promise<TimeTracking> {
    const response = this._put<TimeTracking>(`${resourceName}/stop`, data);
    return responseHandler.required(response);
  }
}
