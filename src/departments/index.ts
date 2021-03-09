import BaseApi from '../baseApi';
import { RequestConfig } from '../utils/configs/requestConfig';
import * as responseHandlers from '../utils/response/responseHandlers';
import { Department } from './types';

export class DepartmentsEndpoint extends BaseApi {
  public readonly resourceName = 'departments';

  public read(config?: RequestConfig<Department>): Promise<Department[]> {
    const response = this._get<Department[]>(`${this.getResourceName()}/read`, config);
    return responseHandlers.list(response);
  }

  public readById(id: number, config?: RequestConfig<Department>): Promise<Department> {
    const response = this._get<Department[]>(`${this.getResourceName()}/read/${id}`, config);
    return responseHandlers.required(response);
  }
}
