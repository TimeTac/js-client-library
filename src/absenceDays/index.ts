import BaseApi from '../baseApi';
import RequestParams from '../utils/requestParams/requestParams';
import { AbsenceDay } from './types';
import * as responseHandlers from '../utils/response/responseHandlers';

export default class AbsenceDaysEndpoint extends BaseApi {
  public readonly resourceName = 'absenceDays';

  public read(requestParams?: RequestParams<AbsenceDay> | Object): Promise<AbsenceDay[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<AbsenceDay[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }

  public readById(id: number, requestParams?: RequestParams<AbsenceDay> | Object): Promise<AbsenceDay> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<AbsenceDay[]>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandlers.required(response);
  }
}
