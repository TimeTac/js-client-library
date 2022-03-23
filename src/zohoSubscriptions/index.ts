import BaseApi from '../baseApi';
import { plainObject } from '../utils/response/responseHandlers';
import { HostedPage } from './types';

const resourceName = 'zohoSubscriptions';
type ResourceName = typeof resourceName;

export class ZohoSubscriptionsEndpoint extends BaseApi<'zohoSubscriptions'> {
  public readonly resourceName = 'zohoSubscriptions';

  public createHostedPage(): Promise<{ Results: HostedPage }> {
    const response = this._post<ResourceName>('createHostedPage');
    return plainObject(response);
  }
}
