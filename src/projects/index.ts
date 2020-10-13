import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import { ReadOptions } from '../utils/types';
import { AxiosRequestConfig } from 'axios';
import { Project } from '../projects/types';

const resourceName = 'projects';

export default class Projects extends BaseApi {
  read(id: number, options: ReadOptions = {}) {
    const axiosConfig: AxiosRequestConfig = {
      params: options,
    };
    const response = this._get<Project>(`${resourceName}/read/${id}`, axiosConfig);
    return responseHandler.requiredList(response);
  }
  readAll(options: ReadOptions = {}) {
    const axiosConfig: AxiosRequestConfig = {
      params: options,
    };
    const response = this._get<Project>(`${resourceName}/read`, axiosConfig);
    return responseHandler.requiredList(response);
  }
}
