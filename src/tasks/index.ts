import BaseApi from '../baseApi';
import { Required, requiredSingle } from '../utils/response/responseHandlers';
import { TaskCreate, TaskUpdate } from './types';

const resourceName = 'tasks';
type ResourceName = typeof resourceName;

export class TasksEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = 'tasks';

  public create(data: TaskCreate): Required<ResourceName> {
    const response = this._post<ResourceName>('create', data);
    return requiredSingle(response);
  }

  public update(data: TaskUpdate): Required<ResourceName> {
    const response = this._put<ResourceName>('update', data);
    return requiredSingle(response);
  }
}
