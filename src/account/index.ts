import BaseApi from '../baseApi';
import { Required, requiredSingle } from '../utils/response/responseHandlers';
import { AccountActivate, AccountUpdate } from './types';

const resourceName = 'account';
type ResourceName = typeof resourceName;

export class AccountEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public async readAccountData(): Required<ResourceName> {
    const response = this._get<ResourceName>('read');
    return requiredSingle(response);
  }

  public async update(data: AccountUpdate): Required<ResourceName> {
    const response = this._put<ResourceName>('update', data);
    return requiredSingle(response);
  }

  public async activate(data: AccountActivate): Required<ResourceName> {
    const response = this._post<ResourceName>('activate', data);
    return requiredSingle(response);
  }
}
