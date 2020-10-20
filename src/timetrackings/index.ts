import BaseApi from '../baseApi';
import { TimeTracking, StartTimeTrackingData, StopTimeTrackingData } from './types';
import responseHandler from '../utils/responseHandlers';
import { AxiosRequestConfig } from 'axios';
import { ReadParams } from '../utils/types';
export default class TimeTrackings extends BaseApi {
  static resourceName = 'timeTrackings';

  public read(options: ReadParams = {}): Promise<TimeTracking[]> {
    const axiosConfig: AxiosRequestConfig = {
      params: options,
    };
    const response = this._get<TimeTracking>(`${TimeTrackings.resourceName}/read`, axiosConfig);
    return responseHandler.requiredList(response);
  }
  public readById(id: number, options: ReadParams = {}): Promise<TimeTracking[]> {
    const axiosConfig: AxiosRequestConfig = {
      params: options,
    };
    const response = this._get<TimeTracking>(`${TimeTrackings.resourceName}/read/${id}`, axiosConfig);
    return responseHandler.required(response);
  }
  public create(data: TimeTracking) {
    const response = this._post<TimeTracking>(`${TimeTrackings.resourceName}/create`, data);
    return responseHandler.required(response);
  }
  public update(data: TimeTracking) {
    const response = this._put<TimeTracking>(`${TimeTrackings.resourceName}/update`, data);
    return responseHandler.required(response);
  }
  public delete(id: number) {
    const response = this._delete<TimeTracking>(`${TimeTrackings.resourceName}/delete/${id}`);
    return responseHandler.required(response);
  }
  public start(data: StartTimeTrackingData): Promise<TimeTracking> {
    const response = this._post<TimeTracking>(`${TimeTrackings.resourceName}/start`, data);
    return responseHandler.required(response);
  }
  public stop(data: StopTimeTrackingData): Promise<TimeTracking> {
    const response = this._put<TimeTracking>(`${TimeTrackings.resourceName}/stop`, data);
    return responseHandler.required(response);
  }

  public current(userId?: number): Promise<TimeTracking | undefined> {
    const params = userId ? { user_id: userId } : {};
    const response = this._get<TimeTracking>(`${TimeTrackings.resourceName}/current`, { params });
    return responseHandler.optional<TimeTracking>(response);
  }
}
