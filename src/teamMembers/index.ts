import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import { TeamMember } from './types';

export default class TeamMembers extends BaseApi {
  static resourceName = 'teamMembers';

  public read(): Promise<TeamMember[]> {
    const response = this.get<TeamMember[]>(`${TeamMembers.resourceName}/read`);
    return responseHandler.requiredList(response);
  }
  public create(): Promise<TeamMember> {
    throw new Error('not Implemented');
  }
}
