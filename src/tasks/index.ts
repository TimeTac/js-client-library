import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParamBuilder';
import { createRawApiResponse } from '../utils/response/rawApiResponse';
import { createReadRawResponse, ReadRawResponse } from '../utils/response/readRawResponse';
import { createResourceResponse } from '../utils/response/resourceResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import { Task, TaskCreate } from './types';

export class TasksEndpoint extends BaseApi {
  public readonly resourceName = 'tasks';

  public read(params?: RequestParams<Task>): Promise<Task[]> {
    const response = this._get<Task[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }

  public async readRaw(params: RequestParams<Task>): Promise<ReadRawResponse<Task>> {
    const response = this._get<Task[]>(`${this.getResourceName()}/read`, { params });
    return createReadRawResponse<Task>(createResourceResponse(await createRawApiResponse(response)), params);
  }

  public readById(id: number, params?: RequestParams<Task>): Promise<Task> {
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
