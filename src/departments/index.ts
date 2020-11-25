import BaseApi from '../baseApi';
import RequestParams from '../utils/requestParams/requestParams';
import { Department } from './types';
import * as responseHandlers from '../utils/response/responseHandlers';

export default class DepartmentsEndpoint extends BaseApi {
  public readonly resourceName = 'departments';

  public read(requestParams?: RequestParams<Department> | Object): Promise<Department[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<Department[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }

  public readById(id: number, requestParams?: RequestParams<Department> | Object): Promise<Department> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<Department[]>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandlers.required(response);
  }
}
