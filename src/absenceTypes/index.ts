import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import { AbsenceType } from './types';
import { ReadParams } from '../utils/types';
import { AxiosRequestConfig } from 'axios';

export default class AbsenceTypes extends BaseApi {
  static resourceName = 'absencesDays';

  public read(options: ReadParams = {}): Promise<AbsenceType[]> {
    const axiosConfig: AxiosRequestConfig = {
      params: options,
    };
    const response = this._get<AbsenceType[]>(`${AbsenceTypes.resourceName}/read`, axiosConfig);
    return responseHandler.requiredList(response);
  }
  public readById(id: number, options: ReadParams = {}): Promise<AbsenceType[]> {
    const axiosConfig: AxiosRequestConfig = {
      params: options,
    };
    const response = this._get<AbsenceType[]>(`${AbsenceTypes.resourceName}/read/${id}`, axiosConfig);
    return responseHandler.required(response);
  }
  public create(): Promise<AbsenceType> {
    throw new Error('not Implemented');
  }
  public update(): Promise<AbsenceType> {
    throw new Error('not Implemented');
  }
  public delete(): Promise<AbsenceType> {
    throw new Error('not Implemented');
  }
}
