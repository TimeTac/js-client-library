import BaseApi from '../baseApi';
import responseHandler from '../utils/response/responseHandlers';
import RequestParams from '../utils/requestParams/requestParams';
import { Department } from './types';

export default class Departments extends BaseApi {
  public readonly resourceName = 'departments';

  public read(requestParams?: RequestParams<Department> | Object): Promise<Department[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<Department[]>(`${this.getResourceName()}/read`, { params });
    return responseHandler.requiredList(response);
  }
  public readById(id: number, requestParams?: RequestParams<Department> | Object): Promise<Department> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<Department>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandler.required(response);
  }
}
