import BaseApi from '../baseApi';
import { Entity } from '../utils/response/apiResponse';
import { required, Required } from '../utils/response/responseHandlers';
import { MessageCreate, MessageUpdate } from './types';
import {RequestParams} from "../utils/params/requestParams";

const resourceName = 'messages';
type ResourceName = typeof resourceName;

export class MessagesEndpoint extends BaseApi<ResourceName> {
  public readonly resourceName = resourceName;

  public create(data: MessageCreate, params?: RequestParams<Entity<ResourceName>> | string): Required<ResourceName, Entity<ResourceName>[]> {
    const response = this._post<ResourceName>('create', data, { params });
    return required(response);
  }

  public update(data: MessageUpdate, params?: RequestParams<Entity<ResourceName>> | string): Required<ResourceName, Entity<ResourceName>[]> {
    const response = this._put<ResourceName>('update', data, { params });
    return required(response);
  }
}
