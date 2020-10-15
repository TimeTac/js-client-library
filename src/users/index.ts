import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import { User } from './types';
import { ReadParams } from '../utils/types';
import { AxiosRequestConfig } from 'axios';

export default class Users extends BaseApi {
  static resourceName = 'users';

  public read(options: ReadParams = {}): Promise<User[]> {
    const axiosConfig: AxiosRequestConfig = {
      params: options,
    };
    const response = this._get<User[]>(`${Users.resourceName}/read`, axiosConfig);
    return responseHandler.requiredList(response);
  }
  public readById(id: number, options: ReadParams = {}): Promise<User[]> {
    const axiosConfig: AxiosRequestConfig = {
      params: options,
    };
    const response = this._get<User[]>(`${Users.resourceName}/read/${id}`, axiosConfig);
    return responseHandler.requiredList(response);
  }
  public readMe(): Promise<User> {
    const response = this._get(`${Users.resourceName}/me`);
    return responseHandler.required(response);
  }
  public create(): Promise<User> {
    throw new Error('not Implemented');
  }
  public update(): Promise<User> {
    throw new Error('not Implemented');
  }
}
