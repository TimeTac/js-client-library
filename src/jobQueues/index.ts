import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { Entity } from '../utils/response/apiResponse';
import { Required, requiredSingle } from '../utils/response/responseHandlers';
import { JobQueueCreate } from './types';

const resourceName = 'jobQueues';
type ResourceName = typeof resourceName;

export class JobQueuesEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public create(data: JobQueueCreate, params?: RequestParams<Entity<ResourceName>>): Required<ResourceName> {
    const response = this._post<ResourceName>(
      'create',
      {
        ...data,
        params: JSON.stringify(data.params),
      },
      params,
    );
    return requiredSingle(response);
  }
}
