import BaseApi from '../baseApi';
import RequestParams from '../utils/requestParams/requestParams';
import { Team } from './types';
import { required, requiredList } from '../utils/response/responseHandlers';

export default class Teams extends BaseApi {
  public readonly resourceName = 'teams';

  public read(requestParams?: RequestParams<Team> | Object): Promise<Team[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<Team[]>(`${this.getResourceName()}/read`, { params });
    return requiredList(response);
  }

  public readById(id: number, requestParams?: RequestParams<Team> | Object): Promise<Team> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<Team[]>(`${this.getResourceName()}/read/${id}`, { params });
    return required(response);
  }

  public create(): Promise<Team> {
    throw new Error('not Implemented');
  }
  public update(): Promise<Team> {
    throw new Error('not Implemented');
  }
}
