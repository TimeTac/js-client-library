import BaseApi from '../baseApi';
import { Action } from '../utils/action';
import { RequestConfig } from '../utils/configs/requestConfig';
import { RequestMaker } from '../utils/requestMaker';
import { DeleteResponse } from '../utils/response/deleteResponse';
import { GetResponse } from '../utils/response/getResponse';
import { PostResponse } from '../utils/response/postResponse';
import { PutResponse } from '../utils/response/putResponse';
import { Task } from './types';

export class TasksEndpoint<R = Task> extends BaseApi {
  public readonly resourceName = 'tasks';

  public read(config: RequestConfig<R>): Promise<R[]> {
    return RequestMaker.get<R>(this, Action.Read, config).then((response) => response.data.results);
  }

  public readRaw(config: RequestConfig<R>): Promise<GetResponse<R>> {
    return RequestMaker.get<R>(this, Action.Read, config);
  }

  public readById(id: number, config: RequestConfig<R>): Promise<R> {
    return RequestMaker.getById<R>(this, Action.Read, config, id).then((response) => response.data.results[0]);
  }

  public create(data: Partial<R>, config: RequestConfig<R>): Promise<PostResponse<R>> {
    return RequestMaker.post<R>(this, Action.Create, config, data);
  }

  public update(data: Partial<R>, config: RequestConfig<R>): Promise<PutResponse<R>> {
    return RequestMaker.put<R>(this, Action.Update, config, data);
  }

  public delete(id: number, config: RequestConfig<R>): Promise<DeleteResponse<R>> {
    return RequestMaker.delete<R>(this, Action.Read, config, id);
  }
}
