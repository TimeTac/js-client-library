import BaseApi from '../baseApi';
import { RequestConfig } from '../utils/configs/requestConfig';
import * as responseHandlers from '../utils/response/responseHandlers';
import { TimePlanning } from './types';

export class TimePlanningsEndpoint extends BaseApi {
  public readonly resourceName = 'timePlannings';

  public read(config?: RequestConfig<TimePlanning>): Promise<TimePlanning[]> {
    const response = this._get<TimePlanning[]>(`${this.getResourceName()}/read`, config);
    return responseHandlers.list(response);
  }

  public readById(id: number, config?: RequestConfig<TimePlanning>): Promise<TimePlanning> {
    const response = this._get<TimePlanning[]>(`${this.getResourceName()}/read/${id}`, config);
    return responseHandlers.required(response);
  }
}
