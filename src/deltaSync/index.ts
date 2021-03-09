import BaseApi from '../baseApi';
import { DeltaSyncRequestConfig } from '../utils/configs/deltaSyncRequestConfig';
import { createDeltaSyncResponse, DeltaSyncResponse } from '../utils/response/deltaSyncResponse';
import { createRawApiResponse } from '../utils/response/rawApiResponse';

export class DeltaSyncEndpoint extends BaseApi {
  public readonly resourceName = 'deltaSync';

  async read(config: DeltaSyncRequestConfig): Promise<DeltaSyncResponse> {
    const response = this._get<unknown>(`${this.getResourceName()}/read`, config);
    return createDeltaSyncResponse(await createRawApiResponse(response));
  }
}
