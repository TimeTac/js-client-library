import BaseApi from '../baseApi';
import { Entity, Resources } from '../utils/response/apiResponse';
import { required, Required, requiredSingle } from '../utils/response/responseHandlers';
import { RequestParams } from '../utils/params/requestParams';
import { AbsenceApprove, AbsenceCreate, AbsenceReject, AbsenceUpdate } from './types';

const resourceName = 'absences';
type ResourceName = typeof resourceName;

export class AbsencesEndpoint extends BaseApi<typeof resourceName> {
  public readonly resourceName = resourceName;

  public create(data: AbsenceCreate, params?: RequestParams<Entity<ResourceName>>): Required<typeof resourceName> {
    const response = this._post<typeof resourceName>('create', data, params);
    return requiredSingle(response);
  }

  public validate(data: AbsenceCreate): Required<typeof resourceName> {
    const response = this._post<typeof resourceName>('validate', data);
    return requiredSingle(response);
  }

  public update(
    data: AbsenceUpdate,
    params?: RequestParams<Entity<ResourceName>>,
  ): Required<typeof resourceName, Resources[typeof resourceName][]> {
    const response = this._put<typeof resourceName>('update', data, params);
    return required(response);
  }

  public approve(data: AbsenceApprove): Required<typeof resourceName, Resources[typeof resourceName][]> {
    const response = this._put<typeof resourceName>('approve', data);
    return required(response);
  }

  public reject(data: AbsenceReject): Required<typeof resourceName, Resources[typeof resourceName][]> {
    const response = this._put<typeof resourceName>('reject', data);
    return required(response);
  }

  public cancel(id: number): Required<typeof resourceName, Resources[typeof resourceName][]> {
    const response = this._put<typeof resourceName>('cancel', { id });
    return required(response);
  }
}
