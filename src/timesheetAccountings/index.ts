import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { Entity, Resources } from '../utils/response/apiResponse';
import { required, Required } from '../utils/response/responseHandlers';
import { TimesheetAccountingApproveRequest } from './types';

const resourceName = 'timesheetAccountings';
type ResourceName = typeof resourceName;

export class TimesheetAccountingsEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public approve(
    data: TimesheetAccountingApproveRequest,
    params?: RequestParams<Entity<ResourceName>>,
  ): Required<typeof resourceName, Resources[typeof resourceName][]> {
    const response = this._put<ResourceName>('approve', data, params);
    return required(response);
  }
}
