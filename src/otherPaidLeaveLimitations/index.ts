import BaseApi from '../baseApi';
import { Entity } from '../utils/response/apiResponse';
import { required, Required } from '../utils/response/responseHandlers';
import { RequestParams } from '../utils/params/requestParams';
import { OtherPaidLeaveLimitationCreate, OtherPaidLeaveLimitationUpdate } from './types';

const resourceName = 'otherPaidLeaveLimitations';
type ResourceName = typeof resourceName;

export class OtherPaidLeaveLimitationsEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public create(
    data: OtherPaidLeaveLimitationCreate,
    params?: RequestParams<Entity<ResourceName>>,
  ): Required<ResourceName, Entity<ResourceName>[]> {
    const response = this._post<ResourceName>('create', data, params);
    return required(response);
  }

  public update(
    data: OtherPaidLeaveLimitationUpdate,
    params?: RequestParams<Entity<ResourceName>>,
  ): Required<ResourceName, Entity<ResourceName>[]> {
    const response = this._put<ResourceName>('update', data, params);
    return required(response);
  }
}
