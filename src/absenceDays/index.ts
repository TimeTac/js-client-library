import BaseApi from '../baseApi';
import { Action } from '../utils/action';
import { RequestConfig } from '../utils/configs/requestConfig';
import { RequestMaker } from '../utils/requestMaker';
import { GetResponse } from '../utils/response/getResponse';
import { AbsenceDay } from './types';

export class AbsenceDaysEndpoint<R = AbsenceDay> extends BaseApi {
  public readonly resourceName = 'absenceDays';

  public read(config: RequestConfig<R>): Promise<R[]> {
    return RequestMaker.get<R>(this, Action.Read, config).then((response) => response.data.results);
  }

  public readRaw(config: RequestConfig<R>): Promise<GetResponse<R>> {
    return RequestMaker.get<R>(this, Action.Read, config);
  }

  public readById(id: number, config: RequestConfig<R>): Promise<R> {
    return RequestMaker.getById<R>(this, Action.Read, config, id).then((response) => response.data.results[0]);
  }
}
