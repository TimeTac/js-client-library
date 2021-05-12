import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { createRawApiResponse } from '../utils/response/rawApiResponse';
import { createReadRawResponse, ReadRawResponse } from '../utils/response/readRawResponse';
import { createResourceResponse } from '../utils/response/resourceResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import { Department } from './types';

export class DepartmentsEndpoint extends BaseApi {
  public readonly resourceName = 'departments';

  public read(params?: RequestParams<Department>): Promise<Department[]> {
    const response = this._get<Department[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }

  public async readRaw(params: RequestParams<Department>): Promise<ReadRawResponse<Department>> {
    const response = this._get<Department[]>(`${this.getResourceName()}/read`, { params });
    return createReadRawResponse<Department>(createResourceResponse(await createRawApiResponse(response)), params);
  }

  public readById(id: number, params?: RequestParams<Department>): Promise<Department> {
    const response = this._get<Department[]>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandlers.required(response);
  }
}
