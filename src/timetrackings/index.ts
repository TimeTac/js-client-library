import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { Entity, LibraryReturn } from '../utils/response/apiResponse';
import { createRawApiResponse } from '../utils/response/rawApiResponse';
import { createReadRawResponse, ReadRawResponse } from '../utils/response/readRawResponse';
import { createResourceResponse } from '../utils/response/resourceResponse';
import { optional, requiredSingle, Required } from '../utils/response/responseHandlers';
import {
  StartTimeTrackingData,
  StopTimeTrackingData,
  TimeTracking,
  TimeTrackingCreate,
  TimeTrackingUpdate,
  ToggleTimeTrackingData,
} from './types';

const resourceName = 'timeTrackings';
type ResourceName = typeof resourceName;

export class TimeTrackingsEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public create(data: TimeTrackingCreate): Required<ResourceName> {
    const response = this._post<ResourceName>('create', data);
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

  public update(data: TimeTrackingUpdate): Required<ResourceName> {
    const response = this._put<ResourceName>('update', data);
    return requiredSingle(response);
  }

  public start(data: StartTimeTrackingData): Promise<LibraryReturn<ResourceName, TimeTracking>> {
    const response = this._post<ResourceName>('start', data);
    return requiredSingle(response);
  }

  public stop(data: StopTimeTrackingData): Promise<LibraryReturn<ResourceName, Entity<ResourceName> | undefined>> {
    const response = this._put<ResourceName>('stop', data);
    return optional(response);
  }

  public toggle(data: ToggleTimeTrackingData): Promise<LibraryReturn<ResourceName, TimeTracking>> {
    const response = this._post<ResourceName>('toggle', data);
    return requiredSingle(response);
  }
}
