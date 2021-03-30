import { RawApiResponse } from '..';
import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { createReadRawResponse, ReadRawResponse } from '../utils/response/readRawResponse';
import { createResourceResponse } from '../utils/response/resourceResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import { RecentTask } from './types';

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
  public async readRaw(params: RequestParams<RecentTask>): Promise<ReadRawResponse<RecentTask>> {
    const response = this._get<RecentTask[]>(`${this.getResourceName()}/read`, { params });
    return createReadRawResponse<RecentTask>(createResourceResponse(((await response) as unknown) as RawApiResponse), params);
  }
}
