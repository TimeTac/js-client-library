import BaseApi from '../baseApi';
import responseHandler from '../utils/response/responseHandlers';
import RequestParams from '../utils/requestParams/requestParams';
import { Project } from './types';
import { ApiResponseOnSuccess } from '../utils/response/apiResponse';

export default class Projects extends BaseApi {
  public readonly resourceName = 'projects';

  public read(requestParams?: RequestParams<Project> | Object): Promise<Project[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<Project>(`${this.getResourceName()}/read`, { params });
    return responseHandler.requiredList(response);
  }
  public readRaw(requestParams?: RequestParams<Project> | Object): Promise<ApiResponseOnSuccess<Project[]>> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<Project>(`${this.getResourceName()}/read`, { params });
    return responseHandler.toApiResponse(response);
  }
  public readById(id: number, requestParams?: RequestParams<Project> | Object): Promise<Project> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<Project>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandler.required(response);
  }
  public create(): Promise<Project> {
    throw new Error('not Implemented');
  }
  public update(): Promise<Project> {
    throw new Error('not Implemented');
  }
  public delete(): Promise<Project> {
    throw new Error('not Implemented');
  }
}
