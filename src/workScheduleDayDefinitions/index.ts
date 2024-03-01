import BaseApi from '../baseApi';
import { Entity, LibraryReturn } from '../utils/response/apiResponse';
import { ParsedErrorMesage, required, Required, requiredBatch, requiredSingle } from '../utils/response/responseHandlers';
import { RequestParams } from '../utils/params/requestParams';
import { WorkScheduleDayDefinitionCreate, WorkScheduleDayDefinitionUpdate, WorkScheduleDayDefinition } from './types';

const resourceName = 'workScheduleDayDefinitions';
type ResourceName = typeof resourceName;

export class WorkScheduleDayDefinitionsEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public create(
    data: WorkScheduleDayDefinitionCreate,
    params?: RequestParams<Entity<ResourceName>>,
  ): Required<ResourceName, Entity<ResourceName>[]> {
    const response = this._post<ResourceName>('create', data, params);
    return required(response);
  }

  public async update(
    data: WorkScheduleDayDefinitionUpdate | WorkScheduleDayDefinitionUpdate[],
  ): Promise<
    | LibraryReturn<'workScheduleDayDefinitions', WorkScheduleDayDefinition>
    | LibraryReturn<'workScheduleDayDefinitions', (ParsedErrorMesage | WorkScheduleDayDefinition)[]>
  > {
    if (Array.isArray(data)) {
      const response = this._putBatch<ResourceName>('update', data);
      return requiredBatch(response);
    } else {
      const response = this._put<ResourceName>('update', data);
      return requiredSingle(response);
    }
  }
}
