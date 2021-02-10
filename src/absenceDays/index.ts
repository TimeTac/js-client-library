import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import * as responseHandlers from '../utils/response/responseHandlers';
import { AbsenceDay } from './types';

export class AbsenceDaysEndpoint extends BaseApi {
  public readonly resourceName = 'absenceDays';

  public read(params?: RequestParams<AbsenceDay>): Promise<AbsenceDay[]> {
    const response = this._get<AbsenceDay[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }

  public readById(id: number, params?: RequestParams<AbsenceDay>): Promise<AbsenceDay> {
    const response = this._get<AbsenceDay[]>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandlers.required(response);
  }
}
