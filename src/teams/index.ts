import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import { Team } from './types';

export default class Teams extends BaseApi {
  static resourceName = 'team';

  public read(): Promise<Team[]> {
    const response = this._get<Team[]>(`${Teams.resourceName}/read`);
    return responseHandler.requiredList(response);
  }
  public create(): Promise<Team> {
    throw new Error('not Implemented');
  }
  public update(): Promise<Team> {
    throw new Error('not Implemented');
  }
}
