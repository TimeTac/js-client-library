import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import { Team } from './types';
import { ReadParams } from '../utils/types';
import { AxiosRequestConfig } from 'axios';

export default class Teams extends BaseApi {
  static resourceName = 'team';

  public read(options: ReadParams = {}): Promise<Team[]> {
    const axiosConfig: AxiosRequestConfig = {
      params: options,
    };
    const response = this._get<Team[]>(`${Teams.resourceName}/read`, axiosConfig);
    return responseHandler.requiredList(response);
  }
  public readById(id: number, options: ReadParams = {}): Promise<Team[]> {
    const axiosConfig: AxiosRequestConfig = {
      params: { ...options, id },
    };
    const response = this._get<Team[]>(`${Teams.resourceName}/read`, axiosConfig);
    return responseHandler.required(response);
  }
  public create(): Promise<Team> {
    throw new Error('not Implemented');
  }
  public update(): Promise<Team> {
    throw new Error('not Implemented');
  }
}
