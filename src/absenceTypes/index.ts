import BaseApi from '../baseApi';
import { Resources } from '../utils/response/apiResponse';
import { required, Required } from '../utils/response/responseHandlers';
import { AbsenceTypeCreate, AbsenceTypeUpdate } from './types';

const resourceName = 'absenceTypes';
type ResourceName = typeof resourceName;
export class AbsenceTypesEndpoint extends BaseApi<typeof resourceName> {
  public readonly resourceName = 'absenceTypes';

  public create(data: AbsenceTypeCreate): Required<typeof resourceName, Resources[typeof resourceName][]> {
    const response = this._post<ResourceName>('create', data);
    return required(response);
  }
  public update(data: AbsenceTypeUpdate): Required<typeof resourceName, Resources[typeof resourceName][]> {
    const response = this._put<ResourceName>('update', data);
    return required(response);
  }
}
