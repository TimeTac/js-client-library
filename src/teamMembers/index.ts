import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import { TeamMember } from './types';
import { ReadParams } from '../utils/types';
import { AxiosRequestConfig } from 'axios';

export default class TeamMembers extends BaseApi {
  static resourceName = 'teamMembers';

  public read(options: ReadParams = {}): Promise<TeamMember[]> {
    const axiosConfig: AxiosRequestConfig = {
      params: options,
    };
    const response = this._get<TeamMember[]>(`${TeamMembers.resourceName}/read`, axiosConfig);
    return responseHandler.requiredList(response);
  }
  public readById(id: number, options: ReadParams = {}): Promise<TeamMember[]> {
    const axiosConfig: AxiosRequestConfig = {
      params: options,
    };
    const response = this._get<TeamMember[]>(`${TeamMembers.resourceName}/read/${id}`, axiosConfig);
    return responseHandler.required(response);
  }
  public create(): Promise<TeamMember> {
    throw new Error('not Implemented');
  }
}
