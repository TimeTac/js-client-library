import BaseApi from '../baseApi';
import responseHandler from '../utils/response/responseHandlers';
import RequestParams from '../utils/requestParams/requestParams';
import { TeamMember } from './types';

export default class TeamMembers extends BaseApi {
  public readonly resourceName = 'teamMembers';

  public read(requestParams?: RequestParams<TeamMember> | Object): Promise<TeamMember[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<TeamMember[]>(`${this.getResourceName()}/read`, { params });
    return responseHandler.requiredList(response);
  }
  public readById(id: number, requestParams?: RequestParams<TeamMember> | Object): Promise<TeamMember[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<TeamMember[]>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandler.required(response);
  }
  public create(): Promise<TeamMember> {
    throw new Error('not Implemented');
  }
}
