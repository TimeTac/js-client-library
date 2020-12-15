import BaseApi from '../baseApi';
import responseHandler from '../utils/response/responseHandlers';
import RequestParams from '../utils/requestParams/requestParams';
import { FavouriteTask, FavouriteTaskCreate } from './types';

export default class FavouriteTasksEndpoint extends BaseApi {
  public readonly resourceName = 'favouriteTasks';

  public read(requestParams?: RequestParams<FavouriteTask> | Object): Promise<FavouriteTask[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<FavouriteTask[]>(`${this.getResourceName()}/read`, { params });

    return responseHandler.requiredList(response);
  }
  public readById(id: number, requestParams?: RequestParams<FavouriteTask> | Object): Promise<FavouriteTask> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<FavouriteTask>(`${this.getResourceName()}/read/${id}`, { params });

    return responseHandler.required(response);
  }
  public create(data: FavouriteTaskCreate): Promise<FavouriteTask> {
    const response = this._post<FavouriteTask>(`${this.getResourceName()}/create`, data);

    return responseHandler.required(response);
  }
  public delete(id: number): Promise<FavouriteTask> {
    const response = this._delete<FavouriteTask>(`${this.getResourceName()}/delete/${id}`);

    return responseHandler.required(response);
  }
}
