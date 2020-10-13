import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import { User } from './types';

export default class Users extends BaseApi {
  static resourceName = 'users';

  public read(): Promise<User[]> {
    const response = this.get<User[]>(`${Users.resourceName}/read`);
    return responseHandler.requiredList(response);
  }
  public readMe(): Promise<User> {
    const response = this.get(`${Users.resourceName}/me`);
    return responseHandler.required(response);
  }
  public create(): Promise<User> {
    throw new Error('not Implemented');
  }
  public update(): Promise<User> {
    throw new Error('not Implemented');
  }
}
