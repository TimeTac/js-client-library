import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { createRawApiResponse } from '../utils/response/rawApiResponse';
import { createReadRawResponse, ReadRawResponse } from '../utils/response/readRawResponse';
import { createResourceResponse } from '../utils/response/resourceResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import { Message, MessageCreate } from './types';

export class MessagesEndpoint extends BaseApi {
  public readonly resourceName = 'messages';

  public read(params?: RequestParams<Message>): Promise<Message[]> {
    const response = this._get<Message[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }

  public async readRaw(params: RequestParams<Message>): Promise<ReadRawResponse<Message>> {
    const response = this._get<Message[]>(`${this.getResourceName()}/read`, { params });
    return createReadRawResponse<Message>(createResourceResponse(await createRawApiResponse(response)), params);
  }

  public readById(id: number, params?: RequestParams<Message>): Promise<Message> {
    const response = this._get<Message[]>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandlers.required(response);
  }

  public create(data: MessageCreate): Promise<Message> {
    const response = this._post<Message[]>(`${this.getResourceName()}/create`, data);
    return responseHandlers.required(response);
  }

  public update(data: Message): Promise<Message> {
    const response = this._put<Message[]>(`${this.getResourceName()}/update`, data);
    return responseHandlers.required(response);
  }

  public delete(id: number): Promise<Message> {
    const response = this._delete<Message[]>(`${this.getResourceName()}/delete/${id}`);

    return responseHandlers.required(response);
  }
}
