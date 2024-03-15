import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { Entity } from '../utils/response/apiResponse';
import { Required, requiredSingle } from '../utils/response/responseHandlers';
import { LegalDocumentAcceptanceLogCreate } from './types';

const resourceName = 'legalDocumentAcceptanceLog';
type ResourceName = typeof resourceName;

export class LegalDocumentAcceptanceLogEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public create(data: LegalDocumentAcceptanceLogCreate, params?: RequestParams<Entity<ResourceName>>): Required<typeof resourceName> {
    const response = this._post<typeof resourceName>('create', data, params);
    return requiredSingle(response);
  }
}
