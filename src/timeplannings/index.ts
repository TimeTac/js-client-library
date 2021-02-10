import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import * as responseHandlers from '../utils/response/responseHandlers';
import { TimePlanning } from './types';

export class TimePlanningsEndpoint extends BaseApi {
  public readonly resourceName = 'timePlannings';

  public read(requestParams?: RequestParams<TimePlanning> | Object): Promise<TimePlanning[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<TimePlanning[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }

  public readById(id: number, requestParams?: RequestParams<TimePlanning> | Object): Promise<TimePlanning> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<TimePlanning[]>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandlers.required(response);
  }
}
