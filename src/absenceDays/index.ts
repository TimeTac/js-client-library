import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import RequestParams from '../utils/requestParams';
import { AbsenceDay } from './types';

export default class AbsenceDays extends BaseApi {
  public readonly resourceName = 'absencesDays';

  public read(requestParams?: RequestParams<AbsenceDay> | Object): Promise<AbsenceDay[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<AbsenceDay[]>(`${this.getResourceName()}/read`, { params });
    return responseHandler.requiredList(response);
  }

  public readById(id: number, requestParams?: RequestParams<AbsenceDay> | Object): Promise<AbsenceDay[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<AbsenceDay[]>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandler.required(response);
  }
}
