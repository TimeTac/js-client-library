import BaseApi from '../baseApi';
import RequestParams from '../utils/requestParams/requestParams';
import { TimeTracking, TimeTrackingCreate, StartTimeTrackingData, StopTimeTrackingData } from './types';
import { optional, required, requiredList } from '../utils/response/responseHandlers';

export default class TimeTrackings extends BaseApi {
  public readonly resourceName = 'timeTrackings';

  public read(requestParams?: RequestParams<TimeTracking> | Object): Promise<TimeTracking[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<TimeTracking[]>(`${this.getResourceName()}/read`, { params });
    return requiredList(response);
  }

  public readById(id: number, requestParams?: RequestParams<TimeTracking> | Object): Promise<TimeTracking> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<TimeTracking[]>(`${this.getResourceName()}/read/${id}`, { params });
    return required(response);
  }

  public current(requestParams?: RequestParams<TimeTracking> | Object): Promise<TimeTracking | undefined> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<TimeTracking[]>(`${this.getResourceName()}/current`, { params });
    return optional(response);
  }

  public create(data: TimeTrackingCreate): Promise<TimeTracking> {
    const response = this._post<TimeTracking[]>(`${this.getResourceName()}/create`, data);
    return required(response);
  }

  public update(data: TimeTracking): Promise<TimeTracking> {
    const response = this._put<TimeTracking[]>(`${this.getResourceName()}/update`, data);
    return required(response);
  }

  public delete(id: number): Promise<TimeTracking> {
    const response = this._delete<TimeTracking[]>(`${this.getResourceName()}/delete/${id}`);
    return required(response);
  }
  public start(data: StartTimeTrackingData): Promise<TimeTracking> {
    const response = this._post<TimeTracking[]>(`${this.getResourceName()}/start`, data);
    return required(response);
  }

  public stop(data: StopTimeTrackingData): Promise<TimeTracking> {
    const response = this._put<TimeTracking[]>(`${this.getResourceName()}/stop`, data);
    return required(response);
  }
}
