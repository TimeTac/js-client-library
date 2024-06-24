import BaseApi from '../baseApi';
import { Entity, LibraryReturn } from '../utils/response/apiResponse';
import { requiredSingle, Required } from '../utils/response/responseHandlers';

import { RequestParams } from '../utils/params/requestParams';
import { HolidayAdjustmentAdd, HolidayAdjustmentRemove } from './types';

const resourceName = 'holidayAdjustment';
type ResourceName = typeof resourceName;

export class HolidayAdjustmentEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public add(data: HolidayAdjustmentAdd, params?: RequestParams<Entity<ResourceName>>): Required<ResourceName> {
    const response = this._post<ResourceName>('add', data, params);
    return requiredSingle(response);
  }

  public async remove(data: HolidayAdjustmentRemove): Promise<LibraryReturn<typeof resourceName>> {
    const response = this._delete<typeof resourceName>('remove', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    });
    return requiredSingle(response);
  }
}
