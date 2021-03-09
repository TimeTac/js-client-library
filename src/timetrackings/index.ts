import BaseApi from '../baseApi';
import { RequestConfig } from '../utils/configs/requestConfig';
import { creatGetResponse, GetResponse } from '../utils/response/getResponse';
import { createRawApiResponse } from '../utils/response/rawApiResponse';
import { createResourceResponse, ResourceResponse } from '../utils/response/resourceResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import { StartTimeTrackingData, StopTimeTrackingData, TimeTracking, TimeTrackingCreate } from './types';

export class TimeTrackingsEndpoint extends BaseApi {
  public readonly resourceName = 'timeTrackings';

  public read(config?: RequestConfig<TimeTracking>): Promise<TimeTracking[]> {
    const response = this._get<TimeTracking[]>(`${this.getResourceName()}/read`, config);
    return responseHandlers.list(response);
  }

  public async readRaw(config: RequestConfig<TimeTracking>): Promise<GetResponse<TimeTracking>> {
    const response = this._get<TimeTracking[]>(`${this.getResourceName()}/read`, config);
    return creatGetResponse<TimeTracking>(createResourceResponse(await createRawApiResponse(response)), config);
  }

  public readById(id: number, config?: RequestConfig<TimeTracking>): Promise<TimeTracking> {
    const response = this._get<TimeTracking[]>(`${this.getResourceName()}/read/${id}`, config);
    return responseHandlers.required(response);
  }

  public current(config?: RequestConfig<TimeTracking>): Promise<TimeTracking | undefined> {
    const response = this._get<TimeTracking[]>(`${this.getResourceName()}/current`, config);
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

  public start(data: StartTimeTrackingData): Promise<ResourceResponse<TimeTracking>> {
    const response = this._post<TimeTracking[]>(`${this.getResourceName()}/start`, data);
    return responseHandlers.toResourceResponse(response);
  }

  public stop(data: StopTimeTrackingData): Promise<TimeTracking> {
    const response = this._put<TimeTracking[]>(`${this.getResourceName()}/stop`, data);
    return responseHandlers.required(response);
  }
}
