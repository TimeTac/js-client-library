import BaseApi from '../baseApi';
import { Entity, LibraryReturn } from '../utils/response/apiResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import { RequestParams } from '../utils/params/requestParams';
import { Feedback } from './types';

const resourceName = 'feedback';
type ResourceName = typeof resourceName;

export class FeedbackEndpoint extends BaseApi<typeof resourceName> {
  public readonly resourceName = resourceName;

  public create(data: Feedback, params?: RequestParams<Entity<ResourceName>>): Promise<LibraryReturn<typeof resourceName>> {
    const response = this._post<typeof resourceName>('create', data, params);
    return responseHandlers.requiredSingle(response);
  }
}
