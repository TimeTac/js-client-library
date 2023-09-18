import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { Entity, LibraryReturn, Resources } from '../utils/response/apiResponse';
import { createRawApiResponse } from '../utils/response/rawApiResponse';
import { createReadRawResponse, ReadRawResponse } from '../utils/response/readRawResponse';
import { createResourceResponse } from '../utils/response/resourceResponse';
import { optional, requiredSingle, Required, required } from '../utils/response/responseHandlers';
import {
  StartTimeTrackingData,
  StopTimeTrackingData,
  TimeTracking,
  TimeTrackingApprove,
  TimeTrackingCreate,
  TimeTrackingReject,
  TimeTrackingUpdate,
  ToggleTimeTrackingData,
} from './types';

const resourceName = 'timeTrackings';
type ResourceName = typeof resourceName;

export class TimeTrackingsEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public create(data: TimeTrackingCreate, params?: RequestParams<Entity<ResourceName>>): Required<ResourceName> {
    const response = this._post<ResourceName>('create', data, params);
    return requiredSingle(response);
  }

  public async readRaw(params: RequestParams<TimeTracking>): Promise<ReadRawResponse<TimeTracking>> {
    const response = this._get<ResourceName>(`read`, { params });
    return createReadRawResponse<TimeTracking>(createResourceResponse(await createRawApiResponse(response)), params);
  }

  public current(params?: RequestParams<TimeTracking>): Promise<LibraryReturn<ResourceName, Entity<ResourceName> | undefined>> {
    const response = this._get<ResourceName>('current', { params });
    return optional(response);
  }

  public update(data: TimeTrackingUpdate, params?: RequestParams<Entity<ResourceName>>): Required<ResourceName> {
    const response = this._put<ResourceName>('update', data, params);
    return requiredSingle(response);
  }

  public start(data: StartTimeTrackingData): Promise<LibraryReturn<ResourceName>> {
    const response = this._post<ResourceName>('start', data);
    return requiredSingle(response);
  }

  public stop(data: StopTimeTrackingData): Promise<LibraryReturn<ResourceName, Entity<ResourceName> | undefined>> {
    const response = this._put<ResourceName>('stop', data);
    return optional(response);
  }

  public approve(data: TimeTrackingApprove): Required<typeof resourceName, Resources[typeof resourceName][]> {
    const response = this._put<ResourceName>('approve', data);
    return required(response);
  }

  public reject(data: TimeTrackingReject): Required<typeof resourceName, Resources[typeof resourceName][]> {
    const response = this._put<ResourceName>('reject', data);
    return required(response);
  }

  public toggle(data: ToggleTimeTrackingData): Promise<LibraryReturn<ResourceName>> {
    const response = this._post<ResourceName>('toggle', data);
    return requiredSingle(response);
  }
}
