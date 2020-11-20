import BaseApi from '../baseApi';
import RequestParams from '../utils/requestParams/requestParams';
import { Task } from './types';
import { required, requiredList } from '../utils/response/responseHandlers';

export default class Tasks extends BaseApi {
  public readonly resourceName = 'tasks';

  public read(requestParams?: RequestParams<Task> | Object): Promise<Task[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<Task[]>(`${this.getResourceName()}/read`, { params });
    return requiredList(response);
  }

  public readById(id: number, requestParams?: RequestParams<Task> | Object): Promise<Task> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<Task[]>(`${this.getResourceName()}/read/${id}`, { params });
    return required(response);
  }

  public create(data: Task): Promise<Task> {
    const response = this._post<Task[]>(`${this.getResourceName()}/create`, data);
    return required(response);
  }

  public update(): Promise<Task> {
    throw new Error('not Implemented');
  }

  public delete(): Promise<Task> {
    throw new Error('not Implemented');
  }
}
