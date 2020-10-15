import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import { Department } from './types';
import { ReadParams } from '../utils/types';
import { AxiosRequestConfig } from 'axios';
import { AbsenceType } from '..';

export default class AbsenceDays extends BaseApi {
  static resourceName = 'absencesDays';

  public read(options: ReadParams = {}): Promise<Department[]> {
    const axiosConfig: AxiosRequestConfig = {
      params: options,
    };
    const response = this._get<Department[]>(`${AbsenceDays.resourceName}/read`, axiosConfig);
    return responseHandler.requiredList(response);
  }
  public readById(id: number, options: ReadParams = {}): Promise<Department[]> {
    const axiosConfig: AxiosRequestConfig = {
      params: { ...options, id },
    };
    const response = this._get<AbsenceType[]>(`${AbsenceDays.resourceName}/read`, axiosConfig);
    return responseHandler.required(response);
  }
}
