import BaseApi from '../baseApi';
import { Entity } from '../utils/response/apiResponse';
import { required, Required } from '../utils/response/responseHandlers';
import { RequestParams } from '../utils/params/requestParams';
import { WorkScheduleCreate, WorkScheduleUpdate } from './types';

const resourceName = 'workSchedules';
type ResourceName = typeof resourceName;

export class WorkSchedulesEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public create(data: WorkScheduleCreate, params?: RequestParams<Entity<ResourceName>>): Required<ResourceName, Entity<ResourceName>[]> {
    const response = this._post<ResourceName>('create', data, params);
    return required(response);
  }

  public update(data: WorkScheduleUpdate, params?: RequestParams<Entity<ResourceName>>): Required<ResourceName, Entity<ResourceName>[]> {
    const response = this._put<ResourceName>('update', data, params);
    return required(response);
  }

  public copy(data: { id: number }, params?: RequestParams<Entity<ResourceName>>): Required<ResourceName, Entity<ResourceName>[]> {
    const response = this._post<ResourceName>('copy', data, params);
    return required(response);
  }
}
