import BaseApi from '../baseApi';

const resourceName = 'legalDocuments';
type ResourceName = typeof resourceName;

export class LegalDocumentsEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;
}
