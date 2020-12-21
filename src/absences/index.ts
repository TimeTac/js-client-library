import BaseApi from '../baseApi';
import * as responseHandlers from '../utils/response/responseHandlers';
import RequestParams from '../utils/requestParams/requestParams';
import { Absence, AbsenceApprove, AbsenceCreate, AbsenceReject, AbsenceUpdate } from './types';

export class AbsencesEndpoint extends BaseApi {
  public readonly resourceName = 'absences';

  public read(requestParams?: RequestParams<Absence> | Object): Promise<Absence[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<Absence[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }

  public readById(id: number, requestParams?: RequestParams<Absence> | Object): Promise<Absence> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<Absence[]>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandlers.required(response);
  }

  public create(data: AbsenceCreate): Promise<Absence> {
    const response = this._post<Absence[]>(`${this.getResourceName()}/create`, data);
    return responseHandlers.required(response);
  }

  public validate(data: AbsenceCreate): Promise<Absence> {
    const response = this._post<Absence[]>(`${this.getResourceName()}/validate`, data);
    return responseHandlers.required(response);
  }

  public update(data: AbsenceUpdate): Promise<Absence> {
    const response = this._put<Absence[]>(`${this.getResourceName()}/update`, data);
    return responseHandlers.required(response);
  }

  public approve(data: AbsenceApprove): Promise<Absence> {
    const response = this._put<Absence[]>(`${this.getResourceName()}/approve`, data);
    return responseHandlers.required(response);
  }

  public reject(data: AbsenceReject): Promise<Absence> {
    const response = this._put<Absence[]>(`${this.getResourceName()}/reject`, data);
    return responseHandlers.required(response);
  }

  public cancel(id: number): Promise<Absence> {
    const response = this._put<Absence[]>(`${this.getResourceName()}/cancel`, { id });
    return responseHandlers.required(response);
  }

  public delete(id: number): Promise<Absence> {
    const response = this._delete<Absence[]>(`${this.getResourceName()}/delete/${id}`);
    return responseHandlers.required(response);
  }
}
