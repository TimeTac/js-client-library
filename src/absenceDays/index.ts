import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import { AbsenceDay } from './types';
import { ReadParams } from '../utils/types';
import { AxiosRequestConfig } from 'axios';

export default class AbsenceDays extends BaseApi {
  static resourceName = 'absencesDays';

  public read(options: ReadParams = {}): Promise<AbsenceDay[]> {
    const axiosConfig: AxiosRequestConfig = {
      params: options,
    };
    const response = this._get<AbsenceDay[]>(`${AbsenceDays.resourceName}/read`, axiosConfig);
    return responseHandler.requiredList(response);
  }
  public readById(id: number, options: ReadParams = {}): Promise<AbsenceDay[]> {
    const axiosConfig: AxiosRequestConfig = {
      params: options,
    };
    const response = this._get<AbsenceDay[]>(`${AbsenceDays.resourceName}/read/${id}`, axiosConfig);
    return responseHandler.required(response);
  }
}
