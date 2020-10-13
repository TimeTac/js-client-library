import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import { User } from './types';

export default class Users extends BaseApi {
  static resourceName = 'users';

  public read(): Promise<User[]> {
    const response = this._get<User[]>(`${Users.resourceName}/read`);
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
