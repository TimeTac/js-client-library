import BaseApi from '../baseApi';
import { ParsedErrorMesage, Required, requiredBatch, requiredSingle } from '../utils/response/responseHandlers';
import { LibraryReturn } from '../utils/response/apiResponse';
import { Department, DepartmentCreate, DepartmentUpdate } from './types';

const resourceName = 'departments';
type ResourceName = typeof resourceName;

export class DepartmentsEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public create(data: DepartmentCreate): Required<ResourceName> {
    const response = this._post<ResourceName>('create', data);
    return requiredSingle(response);
  }

  public async update(data: DepartmentUpdate[]): Required<typeof resourceName, (ParsedErrorMesage | Department)[]>;

  public async update(data: DepartmentUpdate): Required<ResourceName>;

  public async update(
    data: DepartmentUpdate | DepartmentUpdate[]
  ): Promise<LibraryReturn<'departments', Department> | LibraryReturn<'departments', (ParsedErrorMesage | Department)[]>>;

  public async update(
    data: DepartmentUpdate | DepartmentUpdate[]
  ): Promise<LibraryReturn<'departments', Department> | LibraryReturn<'departments', (ParsedErrorMesage | Department)[]>> {
    if (Array.isArray(data)) {
      const response = this._putBatch<ResourceName>('update', data);
      return requiredBatch(response);
    } else {
      const response = this._put<ResourceName>('update', data);
      return requiredSingle(response);
    }
  }
}
