import BaseApi from '../baseApi';
import RequestParams from '../utils/requestParams/requestParams';
import { GeneralSetting } from './types';
import { required, requiredList } from '../utils/response/responseHandlers';

export default class GeneralSettings extends BaseApi {
  public readonly resourceName = 'generalSettings';

  public read(requestParams?: RequestParams<GeneralSetting> | Object): Promise<GeneralSetting[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<GeneralSetting[]>(`${this.getResourceName()}/read`, { params });
    return requiredList(response);
  }

  public readById(id: number, requestParams?: RequestParams<GeneralSetting> | Object): Promise<GeneralSetting> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<GeneralSetting[]>(`${this.getResourceName()}/read/${id}`, { params });
    return required(response);
  }

  public readBySettingType(settingType: string): Promise<GeneralSetting> {
    const params = new RequestParams<GeneralSetting>().eq('setting_type', settingType).getParams();
    const response = this._get<GeneralSetting[]>(`${this.getResourceName()}/read`, { params });
    return required(response);
  }
}
