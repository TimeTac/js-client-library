import BaseApi from '../baseApi';
import { OptionsListReturn } from '../utils/response/apiResponse';
import { requiredSingle } from '../utils/response/responseHandlers';

const resourceName = 'account';
type ResourceName = typeof resourceName;

export class AccountEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public readAccountData(): Promise<OptionsListReturn<ResourceName>> {
    const response = this._get<ResourceName>('read', {});
    return requiredSingle(response);
  }
}
