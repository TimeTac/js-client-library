import BaseApi from '../baseApi';
import { Resources } from '../utils/response/apiResponse';
import { required, Required, requiredSingle } from '../utils/response/responseHandlers';
import { AbsenceApprove, AbsenceCancel, AbsenceCreate, AbsenceReject, AbsenceUpdate } from './types';

const resourceName = 'absences';

export class AbsencesEndpoint extends BaseApi<typeof resourceName> {
  public readonly resourceName = resourceName;

  public create(data: AbsenceCreate): Required<typeof resourceName> {
    const response = this._post<typeof resourceName>('create', data);
    return requiredSingle(response);
  }

  public validate(data: AbsenceCreate): Required<typeof resourceName> {
    const response = this._post<typeof resourceName>('validate', data);
    return requiredSingle(response);
  }

  public update(data: AbsenceUpdate): Required<typeof resourceName, Resources[typeof resourceName][]> {
    const response = this._put<typeof resourceName>('update', data);
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

  public cancel(data: AbsenceCancel): Required<typeof resourceName, Resources[typeof resourceName][]> {
    const response = this._put<typeof resourceName>('cancel', data);
    return required(response);
  }
}
