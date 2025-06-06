import BaseApi from '../baseApi';
import { RequestParamsBuilder } from '../utils/params/requestParams';
import { Entity, LibraryReturn } from '../utils/response/apiResponse';
import { ParsedErrorMessage, required, Required, requiredBatch, requiredSingle } from '../utils/response/responseHandlers';
import { GeneralSetting, GeneralSettingUpdate } from './types';

const resourceName = 'generalSettings';
type ResourceName = typeof resourceName;

export class GeneralSettingsEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public readBySettingType(settingType: string): Required<ResourceName, Entity<ResourceName>[]> {
    const params = new RequestParamsBuilder<GeneralSetting>().eq('setting_type', settingType).build();
    const response = this._get<ResourceName>('read', { params });
    return required(response);
  }

  public async update(
    data: GeneralSettingUpdate | GeneralSettingUpdate[],
  ): Promise<
    LibraryReturn<ResourceName, Entity<ResourceName>> | LibraryReturn<ResourceName, (ParsedErrorMessage | Entity<ResourceName>)[]>
  > {
    if (Array.isArray(data)) {
      const response = this._putBatch<ResourceName>('update', data);
      return requiredBatch(response);
    } else {
      const response = this._put<ResourceName>('update', data);
      return requiredSingle(response);
    }
  }
}
