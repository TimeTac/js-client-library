import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import { Project } from './types';
import { ReadOptions } from '../utils/types';
import { AxiosRequestConfig } from 'axios';

export default class Projects extends BaseApi {
  static resourceName = 'projects';

  read(id: number, options: ReadOptions = {}) {
    const axiosConfig: AxiosRequestConfig = {
      params: options,
    };
    const response = this._get<Project>(`${Projects.resourceName}/read/${id}`, axiosConfig);
    return responseHandler.requiredList(response);
  }
  readAll(options: ReadOptions = {}) {
    const axiosConfig: AxiosRequestConfig = {
      params: options,
    };
    const response = this._get<Project>(`${Projects.resourceName}/read`, axiosConfig);
    return responseHandler.requiredList(response);
  }
  public create(): Promise<Project> {
    throw new Error('not Implemented');
  }
  public update(): Promise<Project> {
    throw new Error('not Implemented');
  }
  public delete(): Promise<Project> {
    throw new Error('not Implemented');
  }
}
