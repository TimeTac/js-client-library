import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import { SyncResource } from './types';
import { ApiResponse } from '../utils/apiResponse';

export default class DeltaSync extends BaseApi {
  async read(
    resources: SyncResource[],
    offset: number,
    limit: number,
    since: string | undefined,
    map: { [index: string]: string }
  ): Promise<ApiResponse<any>> {
    const response = this._get('deltaSync/read/', {
      params: {
        _limit: limit,
        _offset: offset,
        _since: since,
        ...map,
        _includes: resources.join(','),
      },
    });
    return responseHandler.toApiResponse(response);
  }
}
