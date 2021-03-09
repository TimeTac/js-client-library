import BaseApi from '../baseApi';
import { RequestConfig } from '../utils/configs/requestConfig';
import { RequestConfigBuilder } from '../utils/configs/requestConfigBuilder';
import { creatGetResponse, GetResponse } from '../utils/response/getResponse';
import { createRawApiResponse } from '../utils/response/rawApiResponse';
import { createResourceResponse } from '../utils/response/resourceResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import { GeneralSetting } from './types';

export class GeneralSettingsEndpoint extends BaseApi {
  public readonly resourceName = 'generalSettings';

  public read(config?: RequestConfig<GeneralSetting>): Promise<GeneralSetting[]> {
    const response = this._get<GeneralSetting[]>(`${this.getResourceName()}/read`, config);
    return responseHandlers.list(response);
  }

  public async readRaw(config: RequestConfig<GeneralSetting>): Promise<GetResponse<GeneralSetting>> {
    const response = this._get<GeneralSetting[]>(`${this.getResourceName()}/read`, config);
    return creatGetResponse<GeneralSetting>(createResourceResponse(await createRawApiResponse(response)), config);
  }

  public readById(id: number, config?: RequestConfig<GeneralSetting>): Promise<GeneralSetting> {
    const response = this._get<GeneralSetting[]>(`${this.getResourceName()}/read/${id}`, config);
    return responseHandlers.required(response);
  }

  public readBySettingType(settingType: string): Promise<GeneralSetting> {
    const config = new RequestConfigBuilder<GeneralSetting>().eq('setting_type', settingType).build();
    const response = this._get<GeneralSetting[]>(`${this.getResourceName()}/read`, config);
    return responseHandlers.required(response);
  }
}
