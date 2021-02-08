import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import * as responseHandlers from '../utils/response/responseHandlers';
import { TeamMember } from './types';

export class TeamMembersEndpoint extends BaseApi {
  public readonly resourceName = 'teamMembers';

  public read(params?: RequestParams<TeamMember> | Object): Promise<TeamMember[]> {
    const response = this._get<TeamMember[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }

  public readById(id: number, params?: RequestParams<TeamMember> | Object): Promise<TeamMember> {
    const response = this._get<TeamMember[]>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandlers.required(response);
  }

  public create(): Promise<TeamMember> {
    throw new Error('not Implemented');
  }
}
