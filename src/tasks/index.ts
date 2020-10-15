import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import { Task } from './types';
import { ReadParams } from '../utils/types';
import { AxiosRequestConfig } from 'axios';

export default class Tasks extends BaseApi {
  static resourceName = 'projects';

  public read(options: ReadParams = {}): Promise<Task[]> {
    const axiosConfig: AxiosRequestConfig = {
      params: options,
    };
    const response = this._get<Task[]>(`${Tasks.resourceName}/read`, axiosConfig);
    return responseHandler.requiredList(response);
  }
  public readById(id: number, options: ReadParams = {}): Promise<Task[]> {
    const axiosConfig: AxiosRequestConfig = {
      params: { ...options, id },
    };
    const response = this._get<Task[]>(`${Tasks.resourceName}/read`, axiosConfig);
    return responseHandler.required(response);
  }
  public create(): Promise<Task> {
    throw new Error('not Implemented');
  }
  public update(): Promise<Task> {
    throw new Error('not Implemented');
  }
  public delete(): Promise<Task> {
    throw new Error('not Implemented');
  }
}
