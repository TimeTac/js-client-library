import BaseApi from '../baseApi';
import RequestParams from '../utils/requestParams/requestParams';
import { Task } from './types';
import * as responseHandlers from '../utils/response/responseHandlers';
import { ApiResponseOnSuccess } from '../utils/response/apiResponse';

export default class TasksEndpoint extends BaseApi {
  public readonly resourceName = 'tasks';

  public read(requestParams?: RequestParams<Task> | Object): Promise<Task[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<Task[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }
  public readRaw(requestParams?: RequestParams<Task> | Object): Promise<ApiResponseOnSuccess<Task[]>> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<Task[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.toApiResponse(response);
  }
  public readById(id: number, requestParams?: RequestParams<Task> | Object): Promise<Task> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<Task[]>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandlers.required(response);
  }

  public create(data: Task): Promise<Task> {
    const response = this._post<Task[]>(`${this.getResourceName()}/create`, data);
    return responseHandlers.required(response);
  }

  public update(): Promise<Task> {
    throw new Error('not Implemented');
  }

  public delete(): Promise<Task> {
    throw new Error('not Implemented');
  }
}
