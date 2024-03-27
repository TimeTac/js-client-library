import BaseApi from '../../baseApi';
import { RequestParams } from '../../utils/params/requestParams';
import { Entity, LibraryReturn } from '../../utils/response/apiResponse';
import { list, required, requiredSingle } from '../../utils/response/responseHandlers';
import { MonitoringRulesCreate, MonitoringRulesUpdate } from './types';

const resourceName = 'monitoringRules';
type ResourceName = typeof resourceName;

export class MonitoringRulesEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public read(
    params?: RequestParams<Entity<typeof resourceName>> | string,
  ): Promise<LibraryReturn<typeof resourceName, Entity<typeof resourceName>[]>> {
    const response = this._get<typeof resourceName>('read', { params });
    return list(response);
  }

  public update(data: MonitoringRulesUpdate, params?: RequestParams<Entity<ResourceName>>) {
    const response = this._put<ResourceName>('update', data, params);
    return required(response);
  }

  public create(data: MonitoringRulesCreate, params?: RequestParams<Entity<ResourceName>>) {
    const response = this._post<typeof resourceName>('create', data, params);
    return requiredSingle(response);
  }
}
