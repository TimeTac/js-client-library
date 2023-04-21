import BaseApi from '../baseApi';
import {Entity, LibraryReturn, Resources} from '../utils/response/apiResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import {RequestParams} from "../utils/params/requestParams";
import { TodoTaskCreate } from './types';

const resourceName = 'todoTasks';
type ResourceName = typeof resourceName;

export class TodoTasksEndpoint extends BaseApi<typeof resourceName> {
  public readonly resourceName = resourceName;

  public create(data: TodoTaskCreate, params?: RequestParams<Entity<ResourceName>> | string): Promise<LibraryReturn<typeof resourceName, Resources[typeof resourceName][]>> {
    const response = this._post<typeof resourceName>('create', data, { params });
    return responseHandlers.required(response);
  }
}
