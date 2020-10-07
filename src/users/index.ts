import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';

const resourceName = 'users';

export default class Users extends BaseApi {
  getMe() {
    const response = this.get(`${resourceName}/me`);
    return responseHandler.required(response);
  }

  getUser(id: number) {
    const response = this.get(`${resourceName}/${id}`);
    return responseHandler.optional(response);
  }
}
