import BaseApi from '../baseApi';
import { LibraryReturn } from '../utils/response/apiResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import { Feedback } from './types';

const resourceName = 'feedback';

export class FeedbackEndpoint extends BaseApi<typeof resourceName> {
  public readonly resourceName = resourceName;

  public create(data: Feedback): Promise<LibraryReturn<typeof resourceName, Feedback>> {
    const response = this._post<typeof resourceName>('create', data);
    return responseHandlers.requiredSingle(response);
  }
}
