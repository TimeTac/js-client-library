import BaseApi from '../baseApi';
import { Entity } from '../utils/response/apiResponse';
import { required, Required } from '../utils/response/responseHandlers';
import { RequestParams } from '../utils/params/requestParams';
import { WorkScheduleDayDefinitionCreate, WorkScheduleDayDefinitionUpdate } from './types';

const resourceName = 'workScheduleDayDefinitions';
type ResourceName = typeof resourceName;

export class WorkScheduleDayDefinitionsEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public create(
    data: WorkScheduleDayDefinitionCreate,
    params?: RequestParams<Entity<ResourceName>>
  ): Required<ResourceName, Entity<ResourceName>[]> {
    const response = this._post<ResourceName>('create', data, params);
    return required(response);
  }

  public update(
    data: WorkScheduleDayDefinitionUpdate,
    params?: RequestParams<Entity<ResourceName>>
  ): Required<ResourceName, Entity<ResourceName>[]> {
    const response = this._put<ResourceName>('update', data, params);
    return required(response);
  }
}
