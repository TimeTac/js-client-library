import BaseApi from '../baseApi';
import { Entity, Resources } from '../utils/response/apiResponse';
import { required, Required, requiredSingle } from '../utils/response/responseHandlers';
import { RequestParams } from '../utils/params/requestParams';
import { TaskCreate, TaskUpdate } from './types';

const resourceName = 'tasks';
type ResourceName = typeof resourceName;

export class TasksEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public create(data: TaskCreate, params?: RequestParams<Entity<ResourceName>>): Required<ResourceName> {
    const response = this._post<ResourceName>('create', data, params);
    return requiredSingle(response);
  }

  public update(
    data: TaskUpdate,
    params?: RequestParams<Entity<ResourceName>>,
  ): Required<typeof resourceName, Resources[typeof resourceName][]> {
    if ('is_done' in data) {
      console.warn('The "is_done" field is deprecated. Use "status" instead.');
    }
    const response = this._put<ResourceName>('update', data, params);
    return required(response);
  }
}
