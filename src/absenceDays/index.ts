import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { LibraryReturn } from '../utils/response/apiResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import { AbsenceDay } from './types';

const resourceName = 'absenceDays';

export class AbsenceDaysEndpoint extends BaseApi<typeof resourceName> {
  public readonly resourceName = resourceName;

  public read(params?: RequestParams<AbsenceDay>): Promise<LibraryReturn<typeof resourceName>> {
    const response = this._get<typeof resourceName>('read', { params });
    return responseHandlers.list<typeof resourceName>(response);
  }

  public readById(id: number, params?: RequestParams<AbsenceDay>): Promise<AbsenceDay> {
    const response = this._get<typeof resourceName>(`read`, { params });
    return responseHandlers.required(response);
  }
}
