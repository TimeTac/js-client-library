import BaseApi from '../baseApi';
import { Action } from '../utils/action';
import { RequestConfig } from '../utils/configs/requestConfig';
import { RequestMaker } from '../utils/requestMaker';
import { ReadRawResponse } from '../utils/response/readRawResponse';
import { UpdateRawResponse } from '../utils/response/updateRawResponse';
import { User, UserUpdate } from './types';

export class UsersEndpoint<R = User> extends BaseApi {
  public readonly resourceName = 'users';

  public read(config: RequestConfig<R>): Promise<R[]> {
    return RequestMaker.get<R>(this, Action.Read, config).then((response) => response.data.results);
  }
  public readRaw(config: RequestConfig<R>): Promise<ReadRawResponse<R>> {
    return RequestMaker.get<R>(this, Action.Read, config);
  }
  public readById(id: number, config: RequestConfig<R>): Promise<R> {
    return RequestMaker.getById<R>(this, Action.Read, config, id).then((response) => response.data.results[0]);
  }

  public readMe(config: RequestConfig<R>): Promise<R> {
    return RequestMaker.get<R>(this, Action.Me, config).then((response) => response.data.results[0]);
  }

  public create(data: UserUpdate, config: RequestConfig<R>): Promise<unknown> {
    return RequestMaker.post<R>(this, Action.Create, config, data);
  }

  public update(data: UserUpdate, config: RequestConfig<R>): Promise<UpdateRawResponse<R>> {
    return RequestMaker.put<R>(this, Action.Update, config, data);
  }
}
