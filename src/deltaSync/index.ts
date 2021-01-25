import BaseApi from '../baseApi';
import { deltaSyncParams } from '../utils/params/deltaSyncParams';
import { DeltaSyncResult } from './types';

export class DeltaSyncEndpoint extends BaseApi {
  public readonly resourceName = 'deltaSync';

  async read(requestParams: deltaSyncParams) {
    const params = requestParams.getParams();
    const response = this._get<DeltaSyncResult[]>(`${this.getResourceName()}/read`, { params });
    // return createResourceResponse(response, requestParams);
  }
}
