import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import { Department } from './types';
import { ReadParams } from '../utils/types';
import { AxiosRequestConfig } from 'axios';

export default class Departments extends BaseApi {
  static resourceName = 'departments';

  public read(options: ReadParams = {}): Promise<Department[]> {
    const axiosConfig: AxiosRequestConfig = {
      params: options,
    };
    const response = this._get<Department[]>(`${Departments.resourceName}/read`, axiosConfig);
    return responseHandler.requiredList(response);
  }
  public readById(id: number, options: ReadParams = {}): Promise<Department[]> {
    const axiosConfig: AxiosRequestConfig = {
      params: options,
    };
    const response = this._get<Department[]>(`${Departments.resourceName}/read/${id}`, axiosConfig);
    return responseHandler.required(response);
  }
}
