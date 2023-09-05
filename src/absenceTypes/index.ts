import BaseApi from '../baseApi';
import { Entity, Resources } from '../utils/response/apiResponse';
import { required, Required } from '../utils/response/responseHandlers';
import { RequestParams } from '../utils/params/requestParams';
import { AbsenceTypeCreate, AbsenceTypeUpdate } from './types';

const resourceName = 'absenceTypes';
type ResourceName = typeof resourceName;
export class AbsenceTypesEndpoint extends BaseApi<typeof resourceName> {
  public readonly resourceName = 'absenceTypes';

  public create(
    data: AbsenceTypeCreate,
    params?: RequestParams<Entity<ResourceName>>,
  ): Required<typeof resourceName, Resources[typeof resourceName][]> {
    const response = this._post<ResourceName>('create', data, params);
    return required(response);
  }
  public update(
    data: AbsenceTypeUpdate,
    params?: RequestParams<Entity<ResourceName>>,
  ): Required<typeof resourceName, Resources[typeof resourceName][]> {
    const response = this._put<ResourceName>('update', data, params);
    return required(response);
  }
}
