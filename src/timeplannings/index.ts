import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import * as responseHandlers from '../utils/response/responseHandlers';
import { TimePlanning } from './types';

export class TimePlanningsEndpoint extends BaseApi {
  public readonly resourceName = 'timePlannings';

  public read(params?: RequestParams<TimePlanning>): Promise<TimePlanning[]> {
    const response = this._get<TimePlanning[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }

  public readById(id: number, params?: RequestParams<TimePlanning>): Promise<TimePlanning> {
    const response = this._get<TimePlanning[]>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandlers.required(response);
  }
}
