import BaseApi from '../baseApi';
import { RequestParamsBuilder } from '../utils/params/requestParams';
import { LibraryReturn, Resources } from '../utils/response/apiResponse';
import { required } from '../utils/response/responseHandlers';
import { Translation } from './types';

const resourceName = 'translations';
type ResourceName = typeof resourceName;

export class TranslationsEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public readByTranslationKey(translationKey: string): Promise<LibraryReturn<ResourceName, Resources[ResourceName][]>> {
    const params = new RequestParamsBuilder<Translation>().eq('translation_key', translationKey).build();
    const response = this._get<ResourceName>('read', { params });
    return required(response);
  }
}
