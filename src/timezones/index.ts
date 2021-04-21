import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { createRawApiResponse } from '../utils/response/rawApiResponse';
import { createReadRawResponse, ReadRawResponse } from '../utils/response/readRawResponse';
import { createResourceResponse } from '../utils/response/resourceResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import { Timezone } from './types';

export class TimezonesEndpoint extends BaseApi {
  public readonly resourceName = 'timezones';

  public read(params?: RequestParams<Timezone>): Promise<Timezone[]> {
    const response = this._get<Timezone[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }

  public async readRaw(params: RequestParams<Timezone>): Promise<ReadRawResponse<Timezone>> {
    const response = this._get<Timezone[]>(`${this.getResourceName()}/read`, { params });
    return createReadRawResponse<Timezone>(createResourceResponse(await createRawApiResponse(response)), params);
  }

  public readById(id: number, params?: RequestParams<Timezone>): Promise<Timezone> {
    const response = this._get<Timezone[]>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandlers.required(response);
  }
}
