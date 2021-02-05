import BaseApi from '../baseApi';
import { RequestParamBuilder } from '../utils/params/requestParamBuilder';
import * as responseHandlers from '../utils/response/responseHandlers';
import { Team } from './types';

export class TeamsEndpoint extends BaseApi {
  public readonly resourceName = 'teams';

  public read(requestParams?: RequestParamBuilder<Team> | Object): Promise<Team[]> {
    const params = requestParams instanceof RequestParamBuilder ? requestParams.build() : requestParams;
    const response = this._get<Team[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }

  public readById(id: number, requestParams?: RequestParamBuilder<Team> | Object): Promise<Team> {
    const params = requestParams instanceof RequestParamBuilder ? requestParams.build() : requestParams;
    const response = this._get<Team[]>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandlers.required(response);
  }

  public create(): Promise<Team> {
    throw new Error('not Implemented');
  }
  public update(): Promise<Team> {
    throw new Error('not Implemented');
  }
}
