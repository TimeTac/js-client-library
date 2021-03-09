import BaseApi from '../baseApi';
import { RequestConfig } from '../utils/configs/requestConfig';
import { creatGetResponse, GetResponse } from '../utils/response/getResponse';
import { createRawApiResponse } from '../utils/response/rawApiResponse';
import { createResourceResponse } from '../utils/response/resourceResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import { AbsenceType } from './types';

export class AbsenceTypesEndpoint extends BaseApi {
  public readonly resourceName = 'absenceTypes';

  public read(config?: RequestConfig<AbsenceType>): Promise<AbsenceType[]> {
    const response = this._get<AbsenceType[]>(`${this.getResourceName()}/read`, config);
    return responseHandlers.list(response);
  }
  public async readRaw(config: RequestConfig<AbsenceType>): Promise<GetResponse<AbsenceType>> {
    const response = this._get<AbsenceType[]>(`${this.getResourceName()}/read`, config);
    return creatGetResponse<AbsenceType>(createResourceResponse(await createRawApiResponse(response)), config);
  }
  public readById(id: number, config?: RequestConfig<AbsenceType>): Promise<AbsenceType> {
    const response = this._get<AbsenceType[]>(`${this.getResourceName()}/read/${id}`, config);
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
