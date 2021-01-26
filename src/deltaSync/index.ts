import { DeltaSyncResult } from '..';
import BaseApi from '../baseApi';
import { DeltaSyncParams } from '../utils/params/deltaSyncParams';
import { createDeltaSyncResponse, DeltaSyncResponse } from '../utils/response/deltaSyncResponse';
import { resolveAxiosResponse } from '../utils/response/rawApiResponse';
import { DeltaSyncResults } from './types';

export class DeltaSyncEndpoint extends BaseApi {
  public readonly resourceName = 'deltaSync';

  async read(requestParams: DeltaSyncParams): Promise<DeltaSyncResponse> {
    const params = requestParams.getParams();
    const response = this._get<any>(`${this.getResourceName()}/read`, { params });
    return createDeltaSyncResponse(await resolveAxiosResponse(response));
  }
}
