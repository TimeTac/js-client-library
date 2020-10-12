import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import { Task } from './types';

export default class Tasks extends BaseApi {
  static resourceName = 'projects';

  public read(): Promise<Task[]> {
    const response = this.get<Task[]>(`${Tasks.resourceName}/read`);
    return responseHandler.requiredList(response);
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
