import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { ApiResponseOnSuccess } from '../utils/response/apiResponse';
import { AbsenceType } from './types';
import * as responseHandlers from '../utils/response/responseHandlers';

export class AbsenceTypesEndpoint extends BaseApi {
  public readonly resourceName = 'absenceTypes';

  public read(requestParams?: RequestParams<AbsenceType> | Object): Promise<AbsenceType[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<AbsenceType[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }
  public readRaw(requestParams?: RequestParams<AbsenceType> | Object): Promise<ApiResponseOnSuccess<AbsenceType[]>> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<AbsenceType[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.toApiResponse(response);
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
