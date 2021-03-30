import { RawApiResponse } from '..';
import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { createReadRawResponse, ReadRawResponse } from '../utils/response/readRawResponse';
import { createResourceResponse } from '../utils/response/resourceResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import { FavouriteTask, FavouriteTaskCreate } from './types';

export class FavouriteTasksEndpoint extends BaseApi {
  public readonly resourceName = 'favouriteTasks';

  public read(params?: RequestParams<FavouriteTask>): Promise<FavouriteTask[]> {
    const response = this._get<FavouriteTask[]>(`${this.getResourceName()}/read`, { params });

    return responseHandlers.list(response);
  }
  public readById(id: number, params?: RequestParams<FavouriteTask>): Promise<FavouriteTask> {
    const response = this._get<FavouriteTask[]>(`${this.getResourceName()}/read/${id}`, { params });

    return responseHandlers.required(response);
  }
  public async readRaw(params: RequestParams<FavouriteTask>): Promise<ReadRawResponse<FavouriteTask>> {
    const response = this._get<FavouriteTask[]>(`${this.getResourceName()}/read`, { params });
    return createReadRawResponse<FavouriteTask>(createResourceResponse(((await response) as unknown) as RawApiResponse), params);
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
