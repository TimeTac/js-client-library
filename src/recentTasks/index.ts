import BaseApi from '../baseApi';
import { RequestConfig } from '../utils/configs/requestConfig';
import { creatGetResponse, GetResponse } from '../utils/response/getResponse';
import { createRawApiResponse } from '../utils/response/rawApiResponse';
import { createResourceResponse } from '../utils/response/resourceResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import { RecentTask } from './types';

export class RecentTasksEndpoint extends BaseApi {
  public readonly resourceName = 'recentTasks';

  public read(config?: RequestConfig<RecentTask>): Promise<RecentTask[]> {
    const response = this._get<RecentTask[]>(`${this.getResourceName()}/read`, config);

    return responseHandlers.list(response);
  }
  public readById(id: number, config?: RequestConfig<RecentTask>): Promise<RecentTask> {
    const response = this._get<RecentTask[]>(`${this.getResourceName()}/read/${id}`, config);

    return responseHandlers.required(response);
  }
  public async readRaw(config: RequestConfig<RecentTask>): Promise<GetResponse<RecentTask>> {
    const response = this._get<RecentTask[]>(`${this.getResourceName()}/read`, config);
    return creatGetResponse<RecentTask>(createResourceResponse(await createRawApiResponse(response)), config);
  }
}
