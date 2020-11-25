import BaseApi from '../baseApi';
import RequestParams from '../utils/requestParams/requestParams';
import { TeamMember } from './types';
import { required, list } from '../utils/response/responseHandlers';

export default class TeamMembersEndpoint extends BaseApi {
  public readonly resourceName = 'teamMembers';

  public read(requestParams?: RequestParams<TeamMember> | Object): Promise<TeamMember[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<TeamMember[]>(`${this.getResourceName()}/read`, { params });
    return list(response);
  }

  public readById(id: number, requestParams?: RequestParams<TeamMember> | Object): Promise<TeamMember> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<TeamMember[]>(`${this.getResourceName()}/read/${id}`, { params });
    return required(response);
  }

  public create(): Promise<TeamMember> {
    throw new Error('not Implemented');
  }
}
