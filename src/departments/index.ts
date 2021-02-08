import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import * as responseHandlers from '../utils/response/responseHandlers';
import { Department } from './types';

export class DepartmentsEndpoint extends BaseApi {
  public readonly resourceName = 'departments';

  public read(params?: RequestParams<Department>): Promise<Department[]> {
    const response = this._get<Department[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }

  public readById(id: number, params?: RequestParams<Department>): Promise<Department> {
    const response = this._get<Department[]>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandlers.required(response);
  }
}
