import BaseApi from '../baseApi';
import * as responseHandlers from '../utils/response/responseHandlers';
import { RequestParams } from '../utils/params/requestParams';
import { RecentTask, RecentTaskCreate } from './types';

export class RecentTasksEndpoint extends BaseApi {
  public readonly resourceName = 'recentTasks';

  public read(requestParams?: RequestParams<RecentTask> | Object): Promise<RecentTask[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<RecentTask[]>(`${this.getResourceName()}/read`, { params });

    return responseHandlers.list(response);
  }
  public readById(id: number, requestParams?: RequestParams<RecentTask> | Object): Promise<RecentTask> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
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
