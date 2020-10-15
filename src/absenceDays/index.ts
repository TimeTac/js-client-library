import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import RequestParams from '../utils/requestParams';
import { AbsenceDay } from './types';
import { ReadParams } from '../utils/types';
import { AxiosRequestConfig } from 'axios';

export default class AbsenceDays extends BaseApi {
  private readonly resourceName = 'absencesDays';

  public read(requestParams?: RequestParams<AbsenceDay>): Promise<AbsenceDay[]> {
    const response = this.myget(this, '/read', requestParams);
    return responseHandler.requiredList(response);
  }

  public readById(id: number, requestParams?: RequestParams<AbsenceDay>): Promise<AbsenceDay[]> {
    const response = this.myget(this, `/read/${id}`, requestParams);
    return responseHandler.required(response);
  }

  // Move this to BasiAPI (or some where else)
  private myget(endpoint: AbsenceDays, slug: string, requestParams?: RequestParams<Object>): any {
    const params = requestParams ? requestParams.getParams() : {};
    return this._get<any>(`${endpoint.getResourceName()}${slug}`, { params });
  }

  // Also move BaseAPI
  public getResourceName(): String {
    return this.resourceName;
  }

  public getResourcePath(): String {
    return `${this.getApiPath()}${this.getResourceName()}`;
  }
}
