import BaseApi from '../baseApi';
import RequestParams from '../utils/requestParams';
import responseHandler from '../utils/responseHandlers';
import { Project } from './types';

export default class Projects extends BaseApi {
  static resourceName = 'projects';

  public read(requestParams: RequestParams<Project>): Promise<Project[]> {
    const params = requestParams.getParams();
    const response = this.get<Project[]>(`${Projects.resourceName}/read`, { params });
    return responseHandler.requiredList(response);
  }
  public create(): Promise<Project> {
    throw new Error('not Implemented');
  }
  public update(): Promise<Project> {
    throw new Error('not Implemented');
  }
  public delete(): Promise<Project> {
    throw new Error('not Implemented');
  }
}
