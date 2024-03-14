import BaseApi from '../baseApi';

const resourceName = 'legalDocumentAcceptanceLog';
type ResourceName = typeof resourceName;

export class LegalDocumentAcceptanceLogEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
}
