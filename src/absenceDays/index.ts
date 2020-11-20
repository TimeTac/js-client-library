import BaseApi from '../baseApi';
import RequestParams from '../utils/requestParams/requestParams';
import { AbsenceDay } from './types';
import { required, requiredList } from '../utils/response/responseHandlers';

export default class AbsenceDays extends BaseApi {
  public readonly resourceName = 'absencesDays';

  public read(requestParams?: RequestParams<AbsenceDay> | Object): Promise<AbsenceDay[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<AbsenceDay[]>(`${this.getResourceName()}/read`, { params });
    return requiredList(response);
  }

  public readById(id: number, requestParams?: RequestParams<AbsenceDay> | Object): Promise<AbsenceDay> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<AbsenceDay[]>(`${this.getResourceName()}/read/${id}`, { params });
    return required(response);
  }
}
