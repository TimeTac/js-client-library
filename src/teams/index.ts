import BaseApi from '../baseApi';
import { RequestParamsBuilder } from '../utils/params/requestParams';
import * as responseHandlers from '../utils/response/responseHandlers';
import { Team } from './types';

export class TeamsEndpoint extends BaseApi {
  public readonly resourceName = 'teams';

  public read(requestParams?: RequestParamsBuilder<Team> | Object): Promise<Team[]> {
    const params = requestParams instanceof RequestParamsBuilder ? requestParams.build() : requestParams;
    const response = this._get<Team[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }

  public readById(id: number, requestParams?: RequestParamsBuilder<Team> | Object): Promise<Team> {
    const params = requestParams instanceof RequestParamsBuilder ? requestParams.build() : requestParams;
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
