import BaseApi from '../baseApi';
import { RequestConfig } from '../utils/configs/requestConfig';
import { creatGetResponse, GetResponse } from '../utils/response/getResponse';
import { createRawApiResponse } from '../utils/response/rawApiResponse';
import { createResourceResponse } from '../utils/response/resourceResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import { FavouriteTask, FavouriteTaskCreate } from './types';

export class FavouriteTasksEndpoint extends BaseApi {
  public readonly resourceName = 'favouriteTasks';

  public read(config?: RequestConfig<FavouriteTask>): Promise<FavouriteTask[]> {
    const response = this._get<FavouriteTask[]>(`${this.getResourceName()}/read`, config);

    return responseHandlers.list(response);
  }
  public readById(id: number, config?: RequestConfig<FavouriteTask>): Promise<FavouriteTask> {
    const response = this._get<FavouriteTask[]>(`${this.getResourceName()}/read/${id}`, config);

    return responseHandlers.required(response);
  }
  public async readRaw(config: RequestConfig<FavouriteTask>): Promise<GetResponse<FavouriteTask>> {
    const response = this._get<FavouriteTask[]>(`${this.getResourceName()}/read`, config);
    return creatGetResponse<FavouriteTask>(createResourceResponse(await createRawApiResponse(response)), config);
  }
  public create(data: FavouriteTaskCreate): Promise<FavouriteTask> {
    const response = this._post<FavouriteTask[]>(`${this.getResourceName()}/create`, data);

    return responseHandlers.required(response);
  }
  public delete(id: number): Promise<FavouriteTask> {
    const response = this._delete<FavouriteTask[]>(`${this.getResourceName()}/delete/${id}`);

    return responseHandlers.required(response);
  }
}
