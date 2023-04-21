import BaseApi from '../baseApi';
import { Entity } from '../utils/response/apiResponse';
import { required, Required } from '../utils/response/responseHandlers';
import {RequestParams} from "../utils/params/requestParams";
import { FavouriteTaskCreate } from './types';

const resourceName = 'favouriteTasks';
type ResourceName = typeof resourceName;

export class FavouriteTasksEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public create(data: FavouriteTaskCreate, params?: RequestParams<Entity<ResourceName>> | string): Required<ResourceName, Entity<ResourceName>[]> {
    const response = this._post<ResourceName>('create', data, { params });
    return required(response);
  }
}
