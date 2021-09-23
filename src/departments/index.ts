import BaseApi from '../baseApi';
import { Required, requiredSingle } from '../utils/response/responseHandlers';
import { DepartmentCreate } from './types';

const resourceName = 'departments';
type ResourceName = typeof resourceName;

export class DepartmentsEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public create(data: DepartmentCreate): Required<ResourceName> {
    const response = this._post<ResourceName>('create', data);
    return requiredSingle(response);
  }
}
