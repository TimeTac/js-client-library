import BaseApi from '../baseApi';
import { Resources } from '../utils/response/apiResponse';
import { Required, required} from '../utils/response/responseHandlers';
import { TaskCreate } from './types';

const resourceName = 'tasks';
type ResourceName = typeof resourceName;

export class TasksEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = 'tasks';

  public create(data: TaskCreate): Required<ResourceName, Resources[ResourceName][]> {
    const response = this._post<ResourceName>('create', data);
    return required(response);
  }
}
