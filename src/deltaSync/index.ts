import BaseApi from '../baseApi';
import { DeltaSyncParams } from '../utils/params/deltaSyncParams';
import { createDeltaSyncResponse } from '../utils/response/deltaSyncResponse';
import { DeltaSyncResult } from './types';

export class DeltaSyncEndpoint extends BaseApi {
  public readonly resourceName = 'deltaSync';

  async read(requestParams: DeltaSyncParams) {
    const params = requestParams.getParams();
    const response = this._get<DeltaSyncResult>(`${this.getResourceName()}/read`, { params });
    return createDeltaSyncResponse(response, requestParams);
  }
}
