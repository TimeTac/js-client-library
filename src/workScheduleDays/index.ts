import BaseApi from '../baseApi';
import { LibraryReturn } from '../utils/response/apiResponse';
import { ParsedErrorMesage, requiredBatch, requiredSingle } from '../utils/response/responseHandlers';
import { WorkScheduleDay, WorkScheduleDayUpdate } from './types';

const resourceName = 'workScheduleDays';
type ResourceName = typeof resourceName;

export class WorkScheduleDaysEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public async update(
    data: WorkScheduleDayUpdate | WorkScheduleDayUpdate[],
  ): Promise<
    LibraryReturn<'workScheduleDays', WorkScheduleDay> | LibraryReturn<'workScheduleDays', (ParsedErrorMesage | WorkScheduleDay)[]>
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
