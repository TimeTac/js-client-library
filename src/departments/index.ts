import BaseApi from '../baseApi';
import {required, Required, requiredSingle} from '../utils/response/responseHandlers';
import {DepartmentCreate, DepartmentUpdate } from './types';
import { Entity } from "../utils/response/apiResponse";

const resourceName = 'departments';
type ResourceName = typeof resourceName;

export class DepartmentsEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public create(data: DepartmentCreate): Required<ResourceName> {
    const response = this._post<ResourceName>('create', data);
    return requiredSingle(response);
  }

  public update(data: DepartmentUpdate): Required<ResourceName, Entity<ResourceName>[]> {
    const response = this._put<ResourceName>('update', data);
    return required(response);
  }
}
