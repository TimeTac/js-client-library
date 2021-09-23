import BaseApi from '../baseApi';
import { Resources } from '../utils/response/apiResponse';
import { required, Required } from '../utils/response/responseHandlers';
import { MessageCreate, MessageUpdate } from './types';

const resourceName = 'messages';
type ResourceName = typeof resourceName;

export class MessagesEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public create(data: MessageCreate): Required<ResourceName, Resources[ResourceName][]> {
    const response = this._post<ResourceName>('create', data);
    return required(response);
  }

  public update(data: MessageUpdate): Required<ResourceName, Resources[ResourceName][]> {
    const response = this._put<ResourceName>('update', data);
    return required(response);
  }
}
