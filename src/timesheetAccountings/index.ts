import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { Entity, Resources } from '../utils/response/apiResponse';
import { required, Required, requiredSingle } from '../utils/response/responseHandlers';
import { TimesheetAccountingApproveRequest, TimesheetAccountingUpdate } from './types';

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

  public unapprove(
    data: TimesheetAccountingApproveRequest,
    params?: RequestParams<Entity<ResourceName>>,
  ): Required<typeof resourceName, Resources[typeof resourceName][]> {
    const response = this._put<ResourceName>('unapprove', data, params);
    return required(response);
  }

  public update(data: TimesheetAccountingUpdate, params?: RequestParams<Entity<ResourceName>>): Required<ResourceName> {
    const response = this._put<ResourceName>('update', data, params);
    return requiredSingle(response);
  }
}
