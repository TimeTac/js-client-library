import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import * as responseHandlers from '../utils/response/responseHandlers';
import { StartTimeTrackingData, StopTimeTrackingData, TimeTracking, TimeTrackingCreate } from './types';

export class TimeTrackingsEndpoint extends BaseApi {
  public readonly resourceName = 'timeTrackings';

  public read(requestParams?: RequestParams<TimeTracking> | Object): Promise<TimeTracking[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<TimeTracking[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }

  public readById(id: number, requestParams?: RequestParams<TimeTracking> | Object): Promise<TimeTracking> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<TimeTracking[]>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandlers.required(response);
  }

  public current(requestParams?: RequestParams<TimeTracking> | Object): Promise<TimeTracking | undefined> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<TimeTracking[]>(`${this.getResourceName()}/current`, { params });
    return responseHandlers.optional(response);
  }

  public create(data: TimeTrackingCreate): Promise<TimeTracking> {
    const response = this._post<TimeTracking[]>(`${this.getResourceName()}/create`, data);
    return responseHandlers.required(response);
  }

  public update(data: TimeTracking): Promise<TimeTracking> {
    const response = this._put<TimeTracking[]>(`${this.getResourceName()}/update`, data);
    return responseHandlers.required(response);
  }

  public delete(id: number): Promise<TimeTracking> {
    const response = this._delete<TimeTracking[]>(`${this.getResourceName()}/delete/${id}`);
    return responseHandlers.required(response);
  }
  public start(data: StartTimeTrackingData): Promise<TimeTracking> {
    const response = this._post<TimeTracking[]>(`${this.getResourceName()}/start`, data);
    return responseHandlers.required(response);
  }

  public stop(data: StopTimeTrackingData): Promise<TimeTracking> {
    const response = this._put<TimeTracking[]>(`${this.getResourceName()}/stop`, data);
    return responseHandlers.required(response);
  }
}
