import BaseApi from '../baseApi';
import { required, Required, requiredSingle } from '../utils/response/responseHandlers';
import { Entity, Resources } from '../utils/response/apiResponse';
import { RequestParams } from '../utils/params/requestParams';
import { AbsenceBanCreate, AbsenceBanUpdate } from './types';

const resourceName = 'absenceBans';
type ResourceName = typeof resourceName;

export class AbsenceBansEndpoint extends BaseApi<'absenceBans'> {
  public readonly resourceName = resourceName;

  public create(data: AbsenceBanCreate, params?: RequestParams<Entity<ResourceName>>): Required<typeof resourceName> {
    const response = this._post<typeof resourceName>('create', data, params);
    return requiredSingle(response);
  }

  public update(
    data: AbsenceBanUpdate,
    params?: RequestParams<Entity<ResourceName>>
  ): Required<typeof resourceName, Resources[typeof resourceName][]> {
    const response = this._put<typeof resourceName>('update', data, params);
    return required(response);
  }
}
