import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { createRawApiResponse } from '../utils/response/rawApiResponse';
import { createReadRawResponse, ReadRawResponse } from '../utils/response/readRawResponse';
import { createResourceResponse } from '../utils/response/resourceResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import { ChangeTimeTrackingRequest, ChangeTimeTrackingRequestCreate } from './types';

export class ChangeTimeTrackingRequestEndpoint extends BaseApi {
  public readonly resourceName = 'changetimetrackingrequests';

  public read(params?: RequestParams<ChangeTimeTrackingRequest>): Promise<ChangeTimeTrackingRequest[]> {
    const response = this._get<ChangeTimeTrackingRequest[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }

  public async readRaw(params: RequestParams<ChangeTimeTrackingRequest>): Promise<ReadRawResponse<ChangeTimeTrackingRequest>> {
    const response = this._get<ChangeTimeTrackingRequest[]>(`${this.getResourceName()}/read`, { params });
    return createReadRawResponse<ChangeTimeTrackingRequest>(createResourceResponse(await createRawApiResponse(response)), params);
  }

  public readById(id: number, params?: RequestParams<ChangeTimeTrackingRequest>): Promise<ChangeTimeTrackingRequest> {
    const response = this._get<ChangeTimeTrackingRequest[]>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandlers.required(response);
  }
}
