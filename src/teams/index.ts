import BaseApi from '../baseApi';
import { RequestConfig } from '../utils/configs/requestConfig';
import * as responseHandlers from '../utils/response/responseHandlers';
import { Team } from './types';

export class TeamsEndpoint extends BaseApi {
  public readonly resourceName = 'teams';

  public read(config?: RequestConfig<Team>): Promise<Team[]> {
    const response = this._get<Team[]>(`${this.getResourceName()}/read`, config);
    return responseHandlers.list(response);
  }

  public readById(id: number, config?: RequestConfig<Team>): Promise<Team> {
    const response = this._get<Team[]>(`${this.getResourceName()}/read/${id}`, config);
    return responseHandlers.required(response);
  }

  public create(): Promise<Team> {
    throw new Error('not Implemented');
  }
  public update(): Promise<Team> {
    throw new Error('not Implemented');
  }
}
