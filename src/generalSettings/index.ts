import BaseApi from '../baseApi';
import { RequestParamsBuilder } from '../utils/params/requestParams';
import { Entity } from '../utils/response/apiResponse';
import { required, Required } from '../utils/response/responseHandlers';
import { GeneralSetting } from './types';

const resourceName = 'generalSettings';
type ResourceName = typeof resourceName;

export class GeneralSettingsEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = 'generalSettings';

  public readBySettingType(settingType: string): Required<ResourceName, Entity<ResourceName>[]> {
    const params = new RequestParamsBuilder<GeneralSetting>().eq('setting_type', settingType).build();
    const response = this._get<ResourceName>('read', { params });
    return required(response);
  }
}
