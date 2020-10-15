import BaseApi from '../baseApi';
import { Absence } from './types';
import responseHandler from '../utils/responseHandlers';
import { ReadParams } from '../utils/types';
import { AxiosRequestConfig } from 'axios';

export default class Absences extends BaseApi {
  static resourceName = 'absences';

  public read(options: ReadParams = {}): Promise<Absence[]> {
    const axiosConfig: AxiosRequestConfig = {
      params: options,
    };
    const response = this._get<Absence[]>(`${Absences.resourceName}/read`, axiosConfig);
    return responseHandler.requiredList(response);
  }
  public readById(id: number, options: ReadParams = {}): Promise<Absence[]> {
    const axiosConfig: AxiosRequestConfig = {
      params: options,
    };
    const response = this._get<Absence[]>(`${Absences.resourceName}/read/${id}`, axiosConfig);
    return responseHandler.required(response);
  }
  public create(): Promise<Absence> {
    throw new Error('not Implemented');
  }
  public approve(): Promise<Absence> {
    throw new Error('not Implemented');
  }
  public reject(): Promise<Absence> {
    throw new Error('not Implemented');
  }
  public cancel(): Promise<Absence> {
    throw new Error('not Implemented');
  }
}
