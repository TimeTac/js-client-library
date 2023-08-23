import BaseApi from '../baseApi';
import { RequestParamsBuilder } from '../utils/params/requestParams';
import { Entity, LibraryReturn } from '../utils/response/apiResponse';
import { required, Required, requiredSingle } from '../utils/response/responseHandlers';
import { GeneralSetting, GeneralSettingUpdate } from './types';

const resourceName = 'generalSettings';
type ResourceName = typeof resourceName;

export class GeneralSettingsEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = 'generalSettings';

  public readBySettingType(settingType: string): Required<ResourceName, Entity<ResourceName>[]> {
    const params = new RequestParamsBuilder<GeneralSetting>().eq('setting_type', settingType).build();
    const response = this._get<ResourceName>('read', { params });
    return required(response);
  }

  public async updateById(data: GeneralSettingUpdate): Promise<LibraryReturn<ResourceName, Entity<ResourceName>>> {
    const response = this._put<ResourceName>('update', data);
    return requiredSingle(response);
  }
}
