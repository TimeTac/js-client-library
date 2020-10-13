import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import { User } from './types';

const resourceName = 'users';

export default class Users extends BaseApi {
  readMe(): Promise<User> {
    const response = this._get(`${resourceName}/me`);
    return responseHandler.required(response);
  }

  read(id: number): Promise<User | undefined> {
    const response = this._get<User>(`${resourceName}/${id}`);
    return responseHandler.optional(response);
  }
}
