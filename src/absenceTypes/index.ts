import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { ApiResponseWithPages, createApiResponseWithPages } from '../utils/response/apiResponseWithPages';
import * as responseHandlers from '../utils/response/responseHandlers';
import { AbsenceType } from './types';

export class AbsenceTypesEndpoint extends BaseApi {
  public readonly resourceName = 'absenceTypes';

  public read(params?: RequestParams<AbsenceType>): Promise<AbsenceType[]> {
    const response = this._get<AbsenceType>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }
  public async readRaw(params: RequestParams<AbsenceType>): Promise<ApiResponseWithPages<AbsenceType>> {
    const response = (await this._get<AbsenceType>(`${this.getResourceName()}/read`, { params })).data;
    return createApiResponseWithPages(response, params);
  }
  public readById(id: number, params?: RequestParams<AbsenceType>): Promise<AbsenceType> {
    const response = this._get<AbsenceType>(`${this.getResourceName()}/read/${id}`, { params });
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
