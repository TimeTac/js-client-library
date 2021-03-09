import BaseApi from '../baseApi';
import { RequestConfig } from '../utils/configs/requestConfig';
import { createRawApiResponse } from '../utils/response/rawApiResponse';
import { createReadRawResponse, ReadRawResponse } from '../utils/response/readRawResponse';
import { createResourceResponse } from '../utils/response/resourceResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import { Task, TaskCreate } from './types';

export class TasksEndpoint extends BaseApi {
  public readonly resourceName = 'tasks';

  public read(config?: RequestConfig<Task>): Promise<Task[]> {
    const response = this._get<Task[]>(`${this.getResourceName()}/read`, config);
    return responseHandlers.list(response);
  }

  public async readRaw(config: RequestConfig<Task>): Promise<ReadRawResponse<Task>> {
    const response = this._get<Task[]>(`${this.getResourceName()}/read`, config);
    return createReadRawResponse<Task>(createResourceResponse(await createRawApiResponse(response)), config);
  }

  public readById(id: number, config?: RequestConfig<Task>): Promise<Task> {
    const response = this._get<Task[]>(`${this.getResourceName()}/read/${id}`, config);
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
