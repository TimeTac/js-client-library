import BaseApi from '../baseApi';
import RequestParams from '../utils/params/requestParams';
import { GeneralSetting } from './types';
import * as responseHandlers from '../utils/response/responseHandlers';
import { ApiResponseOnSuccess } from '../utils/response/apiResponse';

export class GeneralSettingsEndpoint extends BaseApi {
  public readonly resourceName = 'generalSettings';

  public read(requestParams?: RequestParams<GeneralSetting> | Object): Promise<GeneralSetting[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<GeneralSetting[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }

  public readRaw(requestParams?: RequestParams<GeneralSetting> | Object): Promise<ApiResponseOnSuccess<GeneralSetting[]>> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<GeneralSetting[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.toApiResponse(response);
  }

  public readById(id: number, requestParams?: RequestParams<GeneralSetting> | Object): Promise<GeneralSetting> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<GeneralSetting[]>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandlers.required(response);
  }

  public readBySettingType(settingType: string): Promise<GeneralSetting> {
    const params = new RequestParams<GeneralSetting>().eq('setting_type', settingType).getParams();
    const response = this._get<GeneralSetting[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.required(response);
  }
}
