import BaseApi from '../baseApi';
import { Entity, LibraryReturn } from '../utils/response/apiResponse';
import { ParsedErrorMesage, required, Required, requiredBatch } from '../utils/response/responseHandlers';
import { RequestParams } from '../utils/params/requestParams';
import { OtherPaidLeaveLimitation, OtherPaidLeaveLimitationCreate, OtherPaidLeaveLimitationUpdate } from './types';

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
    data: OtherPaidLeaveLimitationUpdate | OtherPaidLeaveLimitationUpdate[],
    params?: RequestParams<Entity<ResourceName>>,
  ): Promise<
    | LibraryReturn<'otherPaidLeaveLimitations', OtherPaidLeaveLimitation>
    | LibraryReturn<'otherPaidLeaveLimitations', (ParsedErrorMesage | OtherPaidLeaveLimitation)[]>
  > {
    if (Array.isArray(data)) {
      const response = this._putBatch<ResourceName>('update', data);
      return requiredBatch(response);
    } else {
      const response = this._put<ResourceName>('update', data, params);
      return required(response);
    }
  }
}
