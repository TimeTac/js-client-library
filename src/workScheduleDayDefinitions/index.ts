import BaseApi from '../baseApi';
import { Entity } from '../utils/response/apiResponse';
import { required, Required } from '../utils/response/responseHandlers';
import { WorkScheduleDayDefinitionsCreate, WorkScheduleDayDefinitionsUpdate } from './types';

const resourceName = 'workScheduleDayDefinitions';
type ResourceName = typeof resourceName;

export class WorkScheduleDayDefinitionsEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public create(data: WorkScheduleDayDefinitionsCreate): Required<ResourceName, Entity<ResourceName>[]> {
    const response = this._post<ResourceName>('create', data);
    return required(response);
  }

  public update(data: WorkScheduleDayDefinitionsUpdate): Required<ResourceName, Entity<ResourceName>[]> {
    const response = this._put<ResourceName>('update', data);
    return required(response);
  }
}
