import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import { AbsenceDay } from './types';
import { ReadParams } from '../utils/types';
import { Absence } from '..';
import { AxiosRequestConfig } from 'axios';

export default class AbsenceDays extends BaseApi {
  static resourceName = 'absencesDays';

  public read(options: ReadParams = {}): Promise<AbsenceDay[]> {
    const axiosConfig: AxiosRequestConfig = {
      params: options,
    };
    const response = this._get<Absence[]>(`${AbsenceDays.resourceName}/read`, axiosConfig);
    return responseHandler.requiredList(response);
  }
  public readById(id: number, options: ReadParams = {}): Promise<AbsenceDay[]> {
    const axiosConfig: AxiosRequestConfig = {
      params: { ...options, id },
    };
    const response = this._get<Absence[]>(`${AbsenceDays.resourceName}/read`, axiosConfig);
    return responseHandler.required(response);
  }
}
