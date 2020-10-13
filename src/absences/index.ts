import BaseApi from '../baseApi';
import { Absence } from './types';
import responseHandler from '../utils/responseHandlers';
import { ReadOptions } from '../utils/types';
import { AxiosRequestConfig } from 'axios';

const resourceName = 'absences';

export default class Absences extends BaseApi {
  getAll(options: ReadOptions = {}) {
    const axiosConfig: AxiosRequestConfig = {
      params: options,
    };
    const response = this._get<Absence[]>(`${resourceName}/read`, axiosConfig);
    return responseHandler.requiredList(response);
  }
}
