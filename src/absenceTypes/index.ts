import BaseApi from '../baseApi';
import RequestParams from '../utils/requestParams/requestParams';
import { AbsenceType } from './types';
import * as responseHandlers from '../utils/response/responseHandlers';

export default class AbsenceTypes extends BaseApi {
  public readonly resourceName = 'absenceTypes';

  public read(requestParams?: RequestParams<AbsenceType> | Object): Promise<AbsenceType[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<AbsenceType[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }
  public readById(id: number, requestParams?: RequestParams<AbsenceType> | Object): Promise<AbsenceType> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<AbsenceType[]>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandlers.required(response);
  }
  public create(): Promise<AbsenceType> {
    throw new Error('not Implemented');
  }
  public update(): Promise<AbsenceType> {
    throw new Error('not Implemented');
  }
  public delete(): Promise<AbsenceType> {
    throw new Error('not Implemented');
  }
}
