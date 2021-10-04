import BaseApi from '../baseApi';
import { LibraryReturn, Resources } from '../utils/response/apiResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import { TodoTaskCreate } from './types';

const resourceName = 'todoTasks';

export class TodoTasksEndpoint extends BaseApi<typeof resourceName> {
  public readonly resourceName = resourceName;

  public create(data: TodoTaskCreate): Promise<LibraryReturn<typeof resourceName, Resources[typeof resourceName][]>> {
    const response = this._post<typeof resourceName>('create', data);
    return responseHandlers.required(response);
  }
}
