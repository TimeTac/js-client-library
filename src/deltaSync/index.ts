import { RawApiResponse } from '..';
import BaseApi from '../baseApi';
import { DeltaSyncParams } from '../utils/params/deltaSyncParams';
import { createDeltaSyncResponse, DeltaSyncResponse } from '../utils/response/deltaSyncResponse';

export class DeltaSyncEndpoint extends BaseApi {
  public readonly resourceName = 'deltaSync';

  async read(requestParams: DeltaSyncParams): Promise<DeltaSyncResponse> {
    const params = requestParams.build();
    const response = this._get<unknown>(`${this.getResourceName()}/read`, { params });
    return createDeltaSyncResponse(((await response) as unknown) as RawApiResponse);
  }
}
