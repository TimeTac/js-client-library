import BaseApi from '../baseApi';
import { PagingParams } from '../utils/params/pagingParams';
import { RequestParams } from '../utils/params/requestParams';
import { createResponse, Response } from '../utils/response/response';
import * as responseHandlers from '../utils/response/responseHandlers';
import { Task, TaskCreate } from './types';

export class TasksEndpoint extends BaseApi {
  public readonly resourceName = 'tasks';

  public read(requestParams?: RequestParams<Task> | Object): Promise<Task[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<Task[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }
  public readRaw(requestParams: RequestParams<Task> | PagingParams<Task>): Promise<Response<Task>> {
    const params = requestParams.getParams();
    const response = this._get<Task[]>(`${this.getResourceName()}/read`, { params });
    return createResponse(response, requestParams);
  }
  public readById(id: number, requestParams?: RequestParams<Task> | Object): Promise<Task> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<Task[]>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandlers.required(response);
  }

  public create(data: TaskCreate): Promise<Task> {
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
