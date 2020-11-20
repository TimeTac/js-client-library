import BaseApi from '../baseApi';
import { required, requiredList } from '../utils/response/responseHandlers';
import RequestParams from '../utils/requestParams/requestParams';
import { Absence, AbsenceApprove, AbsenceCancel, AbsenceCreate, AbsenceReject, AbsenceUpdate } from './types';

export default class Absences extends BaseApi {
  public readonly resourceName = 'absences';

  public read(requestParams?: RequestParams<Absence> | Object): Promise<Absence[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<Absence[]>(`${this.getResourceName()}/read`, { params });
    return requiredList(response);
  }

  public readById(id: number, requestParams?: RequestParams<Absence> | Object): Promise<Absence> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<Absence[]>(`${this.getResourceName()}/read/${id}`, { params });
    return required(response);
  }

  public create(data: AbsenceCreate): Promise<Absence> {
    const response = this._post<Absence[]>(`${this.getResourceName()}/create`, data);
    return required(response);
  }

  public validate(data: AbsenceCreate): Promise<Absence> {
    const response = this._post<Absence[]>(`${this.getResourceName()}/validate`, data);
    return required(response);
  }

  public update(data: AbsenceUpdate): Promise<Absence> {
    const response = this._put<Absence[]>(`${this.getResourceName()}/update`, data);
    return required(response);
  }

  public approve(data: AbsenceApprove): Promise<Absence> {
    const response = this._put<Absence[]>(`${this.getResourceName()}/approve`, data);
    return required(response);
  }

  public reject(data: AbsenceReject): Promise<Absence> {
    const response = this._put<Absence[]>(`${this.getResourceName()}/reject`, data);
    return required(response);
  }

  public cancel(data: AbsenceCancel): Promise<Absence> {
    const response = this._put<Absence[]>(`${this.getResourceName()}/cancel`, data);
    return required(response);
  }

  public delete(id: number): Promise<Absence> {
    const response = this._delete<Absence[]>(`${this.getResourceName()}/delete/${id}`);
    return required(response);
  }
}
