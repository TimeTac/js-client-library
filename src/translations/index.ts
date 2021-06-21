import BaseApi from '../baseApi';
import { RequestParams, RequestParamsBuilder } from '../utils/params/requestParams';
import { createRawApiResponse } from '../utils/response/rawApiResponse';
import { createReadRawResponse, ReadRawResponse } from '../utils/response/readRawResponse';
import { createResourceResponse } from '../utils/response/resourceResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import { Translation } from './types';

export class TranslationsEndpoint extends BaseApi {
  public readonly resourceName = 'translations';

  public read(params?: RequestParams<Translation>): Promise<Translation[]> {
    const response = this._get<Translation[]>(`${this.getResourceName()}/read`, { params });

    return responseHandlers.list(response);
  }
  public readById(id: number, params?: RequestParams<Translation>): Promise<Translation> {
    const response = this._get<Translation[]>(`${this.getResourceName()}/read/${id}`, { params });

    return responseHandlers.required(response);
  }
  public readByTranslationKey(translationKey: string): Promise<Translation> {
    const params = new RequestParamsBuilder<Translation>().eq('translation_key', translationKey).build();
    const response = this._get<Translation[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.required(response);
  }
  public async readRaw(params: RequestParams<Translation>): Promise<ReadRawResponse<Translation>> {
    const response = this._get<Translation[]>(`${this.getResourceName()}/read`, { params });
    return createReadRawResponse<Translation>(createResourceResponse(await createRawApiResponse(response)), params);
  }
}
