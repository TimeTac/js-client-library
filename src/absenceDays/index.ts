import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import RequestParams from '../utils/requestParams';
import { AbsenceDay } from './types';
import { ReadParams } from '../utils/types';
import { AxiosRequestConfig } from 'axios';

export default class AbsenceDays extends BaseApi {
  private readonly resourceName = 'absencesDays';

  public read(requestParams?: RequestParams<AbsenceDay>): Promise<AbsenceDay[]> {
    const params = requestParams?.getParams() ?? {};
    const response = this._get<AbsenceDay[]>(`${this.getResourceName()}/read`, { params });
    return responseHandler.requiredList(response);
  }

  public readById(id: number, requestParams?: RequestParams<AbsenceDay>): Promise<AbsenceDay[]> {
    const params = requestParams?.getParams() ?? {};
    const response = this._get<AbsenceDay[]>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandler.required(response);
  }

  public getResourceName(): String {
    return this.resourceName;
  }

  public getResourcePath(): String {
    return `${this.getApiPath()}${this.getResourceName()}`;
  }
}
