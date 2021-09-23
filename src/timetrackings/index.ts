import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { LibraryReturn, Resources } from '../utils/response/apiResponse';
import { createRawApiResponse } from '../utils/response/rawApiResponse';
import { createReadRawResponse, ReadRawResponse } from '../utils/response/readRawResponse';
import { createResourceResponse } from '../utils/response/resourceResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import {
  StartTimeTrackingData,
  StopTimeTrackingData,
  TimeTracking,
  TimeTrackingCreate,
  TimeTrackingUpdate,
  ToggleTimeTrackingData,
} from './types';

const resourceName = 'timeTrackings';

export class TimeTrackingsEndpoint extends BaseApi<typeof resourceName>{
  public readonly resourceName = resourceName;

  public read(params?: RequestParams<TimeTracking>): Promise<LibraryReturn<typeof resourceName, Resources[typeof resourceName][]>> {
    const response = this._get<typeof resourceName>('read', { params });
    return responseHandlers.list(response);
  }

  public create(data: TimeTrackingCreate): Promise<LibraryReturn<typeof resourceName, Resources[typeof resourceName][]>> {
    const response = this._post<typeof resourceName>('create', data);
    return responseHandlers.required(response);
  }

  public async readRaw(params: RequestParams<TimeTracking>): Promise<ReadRawResponse<TimeTracking>> {
    const response = this._get<typeof resourceName>(`read`, { params });
    return createReadRawResponse<TimeTracking>(createResourceResponse(await createRawApiResponse(response)), params);
  }

  public readById(id: number, params?: RequestParams<TimeTracking>): Promise<LibraryReturn<typeof resourceName, Resources[typeof resourceName] | never[]>> {
    const response = this._get<typeof resourceName>(`read/${id}`, { params });
    return responseHandlers.optional(response);
  }

  public current(params?: RequestParams<TimeTracking>): Promise<LibraryReturn<typeof resourceName, Resources[typeof resourceName] | never[]>> {
    const response = this._get<typeof resourceName>('current', { params });
    return responseHandlers.optional(response);
  }

  public update(data: TimeTrackingUpdate): Promise<LibraryReturn<typeof resourceName, Resources[typeof resourceName][]>> {
    const response = this._put<typeof resourceName>('update', data);
    return responseHandlers.required(response);
  }

  public delete(id: number): Promise<LibraryReturn<typeof resourceName, Resources[typeof resourceName][]>> {
    const response = this._delete<typeof resourceName>(`delete/${id}`);
    return responseHandlers.required(response);
  }

  public start(data: StartTimeTrackingData): Promise<LibraryReturn<typeof resourceName>> {
    const response = this._post<typeof resourceName>('start', data);
    return responseHandlers.requiredSingle(response);
  }

  public stop(data: StopTimeTrackingData): Promise<LibraryReturn<typeof resourceName, Resources[typeof resourceName] | never[]>> {
    const response = this._put<typeof resourceName>('stop', data);
    return responseHandlers.optional(response);
  }

  public toggle(data: ToggleTimeTrackingData): Promise<LibraryReturn<typeof resourceName>> {
    const response = this._post<typeof resourceName>('toggle', data);
    return responseHandlers.requiredSingle(response);
  }
}
