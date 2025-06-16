import BaseApi from '../baseApi';
import { LibraryReturn } from '../utils/response/apiResponse';
import { ParsedErrorMessage, requiredBatch, requiredSingle } from '../utils/response/responseHandlers';
import { WorkScheduleDayDefinitionCreate, WorkScheduleDayDefinitionUpdate, WorkScheduleDayDefinition } from './types';

const resourceName = 'workScheduleDayDefinitions';
type ResourceName = typeof resourceName;

export class WorkScheduleDayDefinitionsEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public async create(
    data: WorkScheduleDayDefinitionCreate | WorkScheduleDayDefinitionCreate[],
  ): Promise<
    | LibraryReturn<'workScheduleDayDefinitions', WorkScheduleDayDefinition>
    | LibraryReturn<'workScheduleDayDefinitions', (ParsedErrorMessage | WorkScheduleDayDefinition)[]>
  > {
    if (Array.isArray(data)) {
      const response = this._postBatch<ResourceName>('create', data);
      return requiredBatch(response);
    } else {
      const response = this._post<ResourceName>('create', data);
      return requiredSingle(response);
    }
  }

  public async update(
    data: WorkScheduleDayDefinitionUpdate | WorkScheduleDayDefinitionUpdate[],
  ): Promise<
    | LibraryReturn<'workScheduleDayDefinitions', WorkScheduleDayDefinition>
    | LibraryReturn<'workScheduleDayDefinitions', (ParsedErrorMessage | WorkScheduleDayDefinition)[]>
  > {
    if (Array.isArray(data)) {
      const response = this._putBatch<ResourceName>('update', data);
      return requiredBatch(response);
    } else {
      const response = this._put<ResourceName>('update', data);
      return requiredSingle(response);
    }
  }

  public delete(id: number): Promise<LibraryReturn<typeof resourceName>> {
    const response = this._delete<typeof resourceName>(`delete`, { params: { id } });
    return requiredSingle(response);
  }
}
