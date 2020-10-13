import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import { Project } from './types';

export default class Projects extends BaseApi {
  static resourceName = 'projects';

  public read(): Promise<Project[]> {
    const response = this.get<Project[]>(`${Projects.resourceName}/read`);
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
