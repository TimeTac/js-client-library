import BaseApi from '../baseApi';
import { Entity } from '../utils/response/apiResponse';
import { required, Required } from '../utils/response/responseHandlers';
import { WorkScheduleCreate, WorkScheduleUpdate } from './types';
import {RequestParams} from "../utils/params/requestParams";

const resourceName = 'workSchedules';
type ResourceName = typeof resourceName;

export class WorkSchedulesEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public create(data: WorkScheduleCreate, params?: RequestParams<Entity<ResourceName>> | string): Required<ResourceName, Entity<ResourceName>[]> {
    const response = this._post<ResourceName>('create', data, { params });
    return required(response);
  }

  public update(data: WorkScheduleUpdate, params?: RequestParams<Entity<ResourceName>> | string): Required<ResourceName, Entity<ResourceName>[]> {
    const response = this._put<ResourceName>('update', data, { params });
    return required(response);
  }
}
