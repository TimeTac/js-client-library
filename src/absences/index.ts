import BaseApi from '../baseApi';
import { RequestConfig } from '../utils/configs/requestConfig';
import * as responseHandlers from '../utils/response/responseHandlers';
import { Absence, AbsenceApprove, AbsenceCreate, AbsenceReject, AbsenceUpdate } from './types';

export class AbsencesEndpoint extends BaseApi {
  public readonly resourceName = 'absences';

  // eslint-disable-next-line @typescript-eslint/ban-types
  public read(config?: RequestConfig<Absence> | Object): Promise<Absence[]> {
    const response = this._get<Absence[]>(`${this.getResourceName()}/read`, config);
    return responseHandlers.list(response);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public readById(id: number, config?: RequestConfig<Absence> | Object): Promise<Absence> {
    const response = this._get<Absence[]>(`${this.getResourceName()}/read/${id}`, config);
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
