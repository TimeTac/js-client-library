import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import RequestParams from '../utils/requestParams';
import { TimeTracking, StartTimeTrackingData, StopTimeTrackingData } from './types';

export default class TimeTrackings extends BaseApi {
  public readonly resourceName = 'timeTrackings';

  public read(requestParams?: RequestParams<TimeTracking> | Object): Promise<TimeTracking[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<TimeTracking>(`${this.getResourceName()}/read`, { params });
    return responseHandler.requiredList(response);
  }
  public readById(id: number, requestParams?: RequestParams<TimeTracking> | Object): Promise<TimeTracking[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<TimeTracking>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandler.required(response);
  }
  public current(requestParams?: RequestParams<TimeTracking> | Object): Promise<TimeTracking | undefined> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<TimeTracking>(`${this.getResourceName()}/current`, { params });
    return responseHandler.optional<TimeTracking>(response);
  }
  public create(data: TimeTracking) {
    const response = this._post<TimeTracking>(`${this.getResourceName()}/create`, data);
    return responseHandler.required(response);
  }
  public update(data: TimeTracking) {
    const response = this._put<TimeTracking>(`${this.getResourceName()}/update`, data);
    return responseHandler.required(response);
  }
  public delete(id: number) {
    const response = this._delete<TimeTracking>(`${this.getResourceName()}/delete/${id}`);
    return responseHandler.required(response);
  }
  public start(data: StartTimeTrackingData): Promise<TimeTracking> {
    const response = this._post<TimeTracking>(`${this.getResourceName()}/start`, data);
    return responseHandler.required(response);
  }
  public stop(data: StopTimeTrackingData): Promise<TimeTracking> {
    const response = this._put<TimeTracking>(`${this.getResourceName()}/stop`, data);
    return responseHandler.required(response);
  }
}
