import BaseApi from '../baseApi';
import { ApiResponse } from '../utils/response/apiResponse';
import { toApiResponse } from '../utils/response/responseHandlers';
import { SyncResource } from './types';

export class DeltaSyncEndpoint extends BaseApi {
  public readonly resourceName = 'deltaSync';

  async read(
    resources: SyncResource[],
    offset: number,
    limit: number,
    since: string | undefined,
    map: { [index: string]: string }
  ): Promise<ApiResponse<any>> {
    const response = this._get(`${this.getResourceName()}/read`, {
      params: {
        _limit: limit,
        _offset: offset,
        _since: since,
        ...map,
        _include: resources.join(','),
      },
    });
    return toApiResponse(response);
  }
}
