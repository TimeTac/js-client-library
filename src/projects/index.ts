import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import { Project } from './types';
import { ReadParams } from '../utils/types';
import { AxiosRequestConfig } from 'axios';

export default class Projects extends BaseApi {
  static resourceName = 'projects';

  public read(options: ReadParams = {}): Promise<Project[]> {
    const axiosConfig: AxiosRequestConfig = {
      params: options,
    };
    const response = this._get<Project>(`${Projects.resourceName}/read`, axiosConfig);
    return responseHandler.requiredList(response);
  }
  public readById(id: number, options: ReadParams = {}): Promise<Project[]> {
    const axiosConfig: AxiosRequestConfig = {
      params: { ...options, id },
    };
    const response = this._get<Project[]>(`${Projects.resourceName}/read`, axiosConfig);
    return responseHandler.required(response);
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
