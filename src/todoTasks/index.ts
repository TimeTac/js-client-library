import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { createRawApiResponse } from '../utils/response/rawApiResponse';
import { createReadRawResponse, ReadRawResponse } from '../utils/response/readRawResponse';
import { createResourceResponse } from '../utils/response/resourceResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import { TodoTask, TodoTaskCreate } from './types';

export class TodoTasksEndpoint extends BaseApi {
  public readonly resourceName = 'todoTasks';

  public read(params?: RequestParams<TodoTask>): Promise<TodoTask[]> {
    const response = this._get<TodoTask[]>(`${this.getResourceName()}/read`, { params });

    return responseHandlers.list(response);
  }
  public readById(id: number, params?: RequestParams<TodoTask>): Promise<TodoTask> {
    const response = this._get<TodoTask[]>(`${this.getResourceName()}/read/${id}`, { params });

    return responseHandlers.required(response);
  }
  public async readRaw(params: RequestParams<TodoTask>): Promise<ReadRawResponse<TodoTask>> {
    const response = this._get<TodoTask[]>(`${this.getResourceName()}/read`, { params });
    return createReadRawResponse<TodoTask>(createResourceResponse(await createRawApiResponse(response)), params);
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
