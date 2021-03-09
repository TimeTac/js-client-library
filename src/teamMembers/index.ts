import BaseApi from '../baseApi';
import { RequestConfig } from '../utils/configs/requestConfig';
import * as responseHandlers from '../utils/response/responseHandlers';
import { TeamMember } from './types';

export class TeamMembersEndpoint extends BaseApi {
  public readonly resourceName = 'teamMembers';

  public read(config?: RequestConfig<TeamMember>): Promise<TeamMember[]> {
    const response = this._get<TeamMember[]>(`${this.getResourceName()}/read`, config);
    return responseHandlers.list(response);
  }

  public readById(id: number, config?: RequestConfig<TeamMember>): Promise<TeamMember> {
    const response = this._get<TeamMember[]>(`${this.getResourceName()}/read/${id}`, config);
    return responseHandlers.required(response);
  }

  public create(): Promise<TeamMember> {
    throw new Error('not Implemented');
  }
}
