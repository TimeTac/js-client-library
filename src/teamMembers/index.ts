import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { TeamMember } from './types';
import * as responseHandlers from '../utils/response/responseHandlers';

export class TeamMembersEndpoint extends BaseApi {
  public readonly resourceName = 'teamMembers';

  public read(requestParams?: RequestParams<TeamMember> | Object): Promise<TeamMember[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<TeamMember[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }

  public readById(id: number, requestParams?: RequestParams<TeamMember> | Object): Promise<TeamMember> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<TeamMember[]>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandlers.required(response);
  }

  public create(): Promise<TeamMember> {
    throw new Error('not Implemented');
  }
}
