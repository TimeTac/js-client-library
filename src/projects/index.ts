import BaseApi from '../baseApi';
import { RequestConfig } from '../utils/configs/requestConfig';
import { creatGetResponse, GetResponse } from '../utils/response/getResponse';
import { createRawApiResponse } from '../utils/response/rawApiResponse';
import { createResourceResponse } from '../utils/response/resourceResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import { Project } from './types';

export class ProjectsEndpoint extends BaseApi {
  public readonly resourceName = 'projects';

  public read(config?: RequestConfig<Project>): Promise<Project[]> {
    const response = this._get<Project[]>(`${this.getResourceName()}/read`, config);
    return responseHandlers.list(response);
  }

  public async readRaw(config: RequestConfig<Project>): Promise<GetResponse<Project>> {
    const response = this._get<Project[]>(`${this.getResourceName()}/read`, config);
    return creatGetResponse<Project>(createResourceResponse(await createRawApiResponse(response)), config);
  }

  public readById(id: number, config?: RequestConfig<Project>): Promise<Project> {
    const response = this._get<Project[]>(`${this.getResourceName()}/read/${id}`, config);
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
