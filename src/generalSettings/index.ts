import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import RequestParams from '../utils/requestParams';
import { GeneralSetting } from './types';

export default class GeneralSettings extends BaseApi {
  public readonly resourceName = 'generalSettings';

  public read(requestParams?: RequestParams<GeneralSetting> | Object): Promise<GeneralSetting[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<GeneralSetting>(`${this.getResourceName()}/read`, { params });
    return responseHandler.requiredList(response);
  }

  public readById(id: number, requestParams?: RequestParams<GeneralSetting> | Object): Promise<GeneralSetting> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<GeneralSetting>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandler.required(response);
  }

  public readBySettingType(id: number, settingType: string): Promise<GeneralSetting> {
    const params = new RequestParams<GeneralSetting>().eq('setting_type', settingType).getParams();
    const response = this._get<GeneralSetting>(`${this.getResourceName()}/read/`, { params });
    return responseHandler.required(response);
  }
}
