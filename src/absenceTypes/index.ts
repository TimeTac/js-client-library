import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { ApiResponseOnSuccess } from '../utils/response/apiResponse';
import { createRawApiResponse } from '../utils/response/rawApiResponse';
import { createReadRawResponse, ReadRawResponse } from '../utils/response/readRawResponse';
import { createResourceResponse } from '../utils/response/resourceResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import { AbsenceType } from './types';

export class AbsenceTypesEndpoint extends BaseApi {
  public readonly resourceName = 'absenceTypes';

  public read(requestParams?: RequestParams<AbsenceType> | Object): Promise<AbsenceType[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<AbsenceType[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }
  public async readRaw(requestParams: RequestParams<AbsenceType>): Promise<ReadRawResponse<AbsenceType>> {
    const params = requestParams.getParams();
    const response = this._get<AbsenceType[]>(`${this.getResourceName()}/read`, { params });
    return createReadRawResponse<AbsenceType>(createResourceResponse(await createRawApiResponse(response)), requestParams);
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
