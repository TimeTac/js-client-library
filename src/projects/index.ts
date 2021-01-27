import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { resolveAxiosResponse } from '../utils/response/rawApiResponse';
import { createReadRawResponse, ReadRawResponse } from '../utils/response/readRawResponse';
import { createResourceResponse } from '../utils/response/resourceResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import { Project } from './types';

export class ProjectsEndpoint extends BaseApi {
  public readonly resourceName = 'projects';

  public read(requestParams?: RequestParams<Project> | Object): Promise<Project[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<Project[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }

  public async readRaw(requestParams: RequestParams<Project>): Promise<ReadRawResponse<Project>> {
    const params = requestParams.getParams();
    const response = this._get<Project[]>(`${this.getResourceName()}/read`, { params });
    return createReadRawResponse<Project>(createResourceResponse(await resolveAxiosResponse(response)), requestParams);
  }

  public readById(id: number, requestParams?: RequestParams<Project> | Object): Promise<Project> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<Project[]>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandlers.required(response);
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
