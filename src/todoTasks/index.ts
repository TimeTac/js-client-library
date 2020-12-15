import BaseApi from '../baseApi';
import responseHandler from '../utils/response/responseHandlers';
import RequestParams from '../utils/requestParams/requestParams';
import { TodoTask, TodoTaskCreate } from './types';

export default class TodoTasksEndpoint extends BaseApi {
  public readonly resourceName = 'todoTasks';

  public read(requestParams?: RequestParams<TodoTask> | Object): Promise<TodoTask[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<TodoTask[]>(`${this.getResourceName()}/read`, { params });

    return responseHandler.requiredList(response);
  }
  public readById(id: number, requestParams?: RequestParams<TodoTask> | Object): Promise<TodoTask> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<TodoTask>(`${this.getResourceName()}/read/${id}`, { params });

    return responseHandler.required(response);
  }
  public create(data: TodoTaskCreate): Promise<TodoTask> {
    const response = this._post<TodoTask>(`${this.getResourceName()}/create`, data);

    return responseHandler.required(response);
  }
  public delete(id: number): Promise<TodoTask> {
    const response = this._delete<TodoTask>(`${this.getResourceName()}/delete/${id}`);

    return responseHandler.required(response);
  }
}
