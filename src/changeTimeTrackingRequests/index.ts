import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { createRawApiResponse } from '../utils/response/rawApiResponse';
import { createReadRawResponse, ReadRawResponse } from '../utils/response/readRawResponse';
import { createResourceResponse } from '../utils/response/resourceResponse';
import { ChangeTimeTrackingRequest } from './types';

const resourceName = 'changeTimeTrackingRequests';

export class ChangeTimeTrackingRequestEndpoint extends BaseApi<typeof resourceName> {
  public readonly resourceName = resourceName;

  public async readRaw(params: RequestParams<ChangeTimeTrackingRequest>): Promise<ReadRawResponse<ChangeTimeTrackingRequest>> {
    const response = this._get<typeof resourceName>('read', { params });
    return createReadRawResponse<ChangeTimeTrackingRequest>(createResourceResponse(await createRawApiResponse(response)), params);
  }
}
