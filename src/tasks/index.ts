import BaseApi from '../baseApi';
import { LibraryReturn, Resources } from '../utils/response/apiResponse';
import { required, Required, requiredSingle } from '../utils/response/responseHandlers';
import { Task, TaskCreate, TaskUpdate } from './types';

const resourceName = 'tasks';
type ResourceName = typeof resourceName;

export class TasksEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = 'tasks';

  private filterByParamsForRequired(response: Required<ResourceName, Task[]>, params: Array<keyof Task>) {
    return response.then((data) => {
      const task = {} as Task;
      return {
        ...data,
        Results: data.Results.map((item) => {
          return Object.keys(item)
            .filter((key) => params.includes(key as keyof Task))
            .reduce(
              (result, key) =>
                Object.assign(result, {
                  [key]: item[key as keyof Task],
                }),
              task
            );
        }),
      };
    });
  }

  private filterByParamsForLibraryReturn(response: Promise<LibraryReturn<ResourceName, Task>>, params: Array<keyof Task>) {
    const task = {} as Task;
    return response.then((data) => ({
      ...data,
      Results: Object.keys(data.Results)
        .filter((key) => params.includes(key as keyof Task))
        .reduce(
          (result, key) =>
            Object.assign(result, {
              [key]: data.Results[key as keyof Task],
            }),
          task
        ),
    }));
  }

  public create(data: TaskCreate, params?: Array<keyof Task>): Required<ResourceName> {
    const response = this._post<ResourceName>('create', data);
    if (params) {
      return this.filterByParamsForLibraryReturn(requiredSingle(response), params);
    }
    return requiredSingle(response);
  }

  public update(data: TaskUpdate, params?: Array<keyof Task>): Required<typeof resourceName, Resources[typeof resourceName][]> {
    const response = this._put<ResourceName>('update', data);
    if (params) {
      return this.filterByParamsForRequired(required(response), params);
    }
    return required(response);
  }
}
