import BaseApi from '../baseApi';
import { RequestParams, RequestParamsBuilder } from '../utils/params/requestParams';
import { createRawApiResponse } from '../utils/response/rawApiResponse';
import { createReadRawResponse, ReadRawResponse } from '../utils/response/readRawResponse';
import { createResourceResponse } from '../utils/response/resourceResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import { GeneralSetting } from './types';

export class GeneralSettingsEndpoint extends BaseApi {
  public readonly resourceName = 'generalSettings';

  public read(params?: RequestParams<GeneralSetting>): Promise<GeneralSetting[]> {
    const response = this._get<GeneralSetting[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }

  public async readRaw(params: RequestParams<GeneralSetting>): Promise<ReadRawResponse<GeneralSetting>> {
    const response = this._get<GeneralSetting[]>(`${this.getResourceName()}/read`, { params });
    return createReadRawResponse<GeneralSetting>(createResourceResponse(await createRawApiResponse(response)), params);
  }

  public readById(id: number, params?: RequestParams<GeneralSetting>): Promise<GeneralSetting> {
    const response = this._get<GeneralSetting[]>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandlers.required(response);
  }

  public readBySettingType(settingType: string): Promise<GeneralSetting> {
    const params = new RequestParamsBuilder<GeneralSetting>().eq('setting_type', settingType).build();
    const response = this._get<GeneralSetting[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.required(response);
  }
}
