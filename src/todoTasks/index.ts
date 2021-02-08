import BaseApi from '../baseApi';
import { RequestParams, RequestParamsBuilder } from '../utils/params/requestParams';
import * as responseHandlers from '../utils/response/responseHandlers';
import { TodoTask, TodoTaskCreate } from './types';

export class TodoTasksEndpoint extends BaseApi {
  public readonly resourceName = 'todoTasks';

  public read(params?: RequestParams<TodoTask>): Promise<TodoTask[]> {
    const response = this._get<TodoTask[]>(`${this.getResourceName()}/read`, { params });

    return responseHandlers.list(response);
  }
  public readById(id: number, requestParams?: RequestParamsBuilder<TodoTask> | Object): Promise<TodoTask> {
    const params = requestParams instanceof RequestParamsBuilder ? requestParams.build() : requestParams;
    const response = this._get<TodoTask[]>(`${this.getResourceName()}/read/${id}`, { params });

    return responseHandlers.required(response);
  }
  public create(data: TodoTaskCreate): Promise<TodoTask> {
    const response = this._post<TodoTask[]>(`${this.getResourceName()}/create`, data);

    return responseHandlers.required(response);
  }
  public delete(id: number): Promise<TodoTask> {
    const response = this._delete<TodoTask[]>(`${this.getResourceName()}/delete/${id}`);

    return responseHandlers.required(response);
  }
}
