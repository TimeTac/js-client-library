import BaseApi from '../baseApi';
import { RequestConfig } from '../utils/configs/requestConfig';
import * as responseHandlers from '../utils/response/responseHandlers';
import { AbsenceDay } from './types';

export class AbsenceDaysEndpoint extends BaseApi {
  public readonly resourceName = 'absenceDays';

  public read(config?: RequestConfig<AbsenceDay>): Promise<AbsenceDay[]> {
    const response = this._get<AbsenceDay[]>(`${this.getResourceName()}/read`, config);
    return responseHandlers.list(response);
  }

  public readById(id: number, config?: RequestConfig<AbsenceDay>): Promise<AbsenceDay> {
    const response = this._get<AbsenceDay[]>(`${this.getResourceName()}/read/${id}`, config);
    return responseHandlers.required(response);
  }
}
