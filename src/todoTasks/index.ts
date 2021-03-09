import BaseApi from '../baseApi';
import { RequestConfig } from '../utils/configs/requestConfig';
import { creatGetResponse, GetResponse } from '../utils/response/getResponse';
import { createRawApiResponse } from '../utils/response/rawApiResponse';
import { createResourceResponse } from '../utils/response/resourceResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import { TodoTask, TodoTaskCreate } from './types';

export class TodoTasksEndpoint extends BaseApi {
  public readonly resourceName = 'todoTasks';

  public read(config?: RequestConfig<TodoTask>): Promise<TodoTask[]> {
    const response = this._get<TodoTask[]>(`${this.getResourceName()}/read`, config);

    return responseHandlers.list(response);
  }
  public readById(id: number, config?: RequestConfig<TodoTask>): Promise<TodoTask> {
    const response = this._get<TodoTask[]>(`${this.getResourceName()}/read/${id}`, config);

    return responseHandlers.required(response);
  }
  public async readRaw(config: RequestConfig<TodoTask>): Promise<GetResponse<TodoTask>> {
    const response = this._get<TodoTask[]>(`${this.getResourceName()}/read`, config);
    return creatGetResponse<TodoTask>(createResourceResponse(await createRawApiResponse(response)), config);
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
