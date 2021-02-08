import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import * as responseHandlers from '../utils/response/responseHandlers';
import { RecentTask, RecentTaskCreate } from './types';

export class RecentTasksEndpoint extends BaseApi {
  public readonly resourceName = 'recentTasks';

  public read(params?: RequestParams<RecentTask>): Promise<RecentTask[]> {
    const response = this._get<RecentTask[]>(`${this.getResourceName()}/read`, { params });

    return responseHandlers.list(response);
  }
  public readById(id: number, params?: RequestParams<RecentTask>): Promise<RecentTask> {
    const response = this._get<RecentTask[]>(`${this.getResourceName()}/read/${id}`, { params });

    return responseHandlers.required(response);
  }
  public create(data: RecentTaskCreate): Promise<RecentTask> {
    const response = this._post<RecentTask[]>(`${this.getResourceName()}/create`, data);

    return responseHandlers.required(response);
  }
  public delete(id: number): Promise<RecentTask> {
    const response = this._delete<RecentTask[]>(`${this.getResourceName()}/delete/${id}`);

    return responseHandlers.required(response);
  }
}
