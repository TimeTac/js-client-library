import BaseApi from '../baseApi';
import responseHandler from '../utils/response/responseHandlers';
import RequestParams from '../utils/requestParams/requestParams';
import { ApiResponseOnSuccess } from '../utils/response/apiResponse';
import { AbsenceType } from './types';

export default class AbsenceTypes extends BaseApi {
  public readonly resourceName = 'absenceTypes';

  public read(requestParams?: RequestParams<AbsenceType> | Object): Promise<AbsenceType[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<AbsenceType[]>(`${this.getResourceName()}/read`, { params });
    return responseHandler.requiredList(response);
  }
  public readRaw(requestParams?: RequestParams<AbsenceType> | Object): Promise<ApiResponseOnSuccess<AbsenceType[]>> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<AbsenceType[]>(`${this.getResourceName()}/read`, { params });
    return responseHandler.toApiResponse(response);
  }
  public readById(id: number, requestParams?: RequestParams<AbsenceType> | Object): Promise<AbsenceType> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<AbsenceType>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandler.required(response);
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
