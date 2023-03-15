import BaseApi from '../baseApi';
import { Entity } from '../utils/response/apiResponse';
import { required, Required } from '../utils/response/responseHandlers';
import { WorkScheduleDayUpdate } from './types';

const resourceName = 'workScheduleDays';
type ResourceName = typeof resourceName;

export class WorkScheduleDaysEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public update(data: WorkScheduleDayUpdate): Required<ResourceName, Entity<ResourceName>[]> {
    const response = this._put<ResourceName>('update', data);
    return required(response);
  }
}
