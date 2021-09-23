import BaseApi from '../baseApi';
import { Resources } from '../utils/response/apiResponse';
import { required, Required} from '../utils/response/responseHandlers';
import { FavouriteTaskCreate } from './types';

const resourceName = 'favouriteTasks';
type ResourceName = typeof resourceName;

export class FavouriteTasksEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public create(data: FavouriteTaskCreate): Required<ResourceName, Resources[ResourceName][]> {
    const response = this._post<ResourceName>('create', data);
    return required(response);
  }
}
