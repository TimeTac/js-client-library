import BaseApi from '../baseApi';
import {Entity, Resources} from '../utils/response/apiResponse';
import { required, Required, requiredSingle } from '../utils/response/responseHandlers';
import { TaskCreate, TaskUpdate } from './types';
import {RequestParams} from "../utils/params/requestParams";

const resourceName = 'tasks';
type ResourceName = typeof resourceName;

export class TasksEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = 'tasks';

  public create(data: TaskCreate, params?: RequestParams<Entity<ResourceName>> | string): Required<ResourceName> {
    const response = this._post<ResourceName>('create', data, { params });
    return requiredSingle(response);
  }

  public update(data: TaskUpdate, params?: RequestParams<Entity<ResourceName>> | string): Required<typeof resourceName, Resources[typeof resourceName][]> {
    const response = this._put<ResourceName>('update', data, { params });
    return required(response);
  }
}
