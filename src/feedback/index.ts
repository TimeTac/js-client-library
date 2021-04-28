import BaseApi from '../baseApi';
import * as responseHandlers from '../utils/response/responseHandlers';
import { FeedbackCreate, FeedbackResponse } from './types';

export class FeedbackEndpoint extends BaseApi {
  public readonly resourceName = 'feedback';

  public create(data: FeedbackCreate): Promise<FeedbackResponse> {
    const response = this._post<FeedbackResponse[]>(`${this.getResourceName()}/create`, data);
    return responseHandlers.required(response);
  }
}
