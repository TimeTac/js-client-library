import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import RequestParams from '../utils/requestParams';
import { Absence } from './types';

export default class Absences extends BaseApi {
  public readonly resourceName = 'absences';

  public read(requestParams?: RequestParams<Absence> | Object): Promise<Absence[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<Absence[]>(`${this.getResourceName()}/read`, { params });
    return responseHandler.requiredList(response);
  }
  public readById(id: number, requestParams?: RequestParams<Absence> | Object): Promise<Absence[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<Absence[]>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandler.required(response);
  }
  public create(): Promise<Absence> {
    throw new Error('not Implemented');
  }
  public approve(): Promise<Absence> {
    throw new Error('not Implemented');
  }
  public reject(): Promise<Absence> {
    throw new Error('not Implemented');
  }
  public cancel(): Promise<Absence> {
    throw new Error('not Implemented');
  }
}
