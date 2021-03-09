import axios, { AxiosRequestConfig } from 'axios';

import BaseApi from '../baseApi';
import { createDeleteResponse, DeleteResponse } from '../utils/response/deleteResponse';
import { createPostResponse, PostResponse } from '../utils/response/postResponse';
import { Action } from './action';
import { DeltaSyncRequestConfig } from './configs/deltaSyncRequestConfig';
import { RequestConfig } from './configs/requestConfig';
import { ApiResponse } from './response/apiResponse';
import { createDeltaSyncResponse, DeltaSyncResponse } from './response/deltaSyncResponse';
import { creatGetResponse, GetResponse } from './response/getResponse';
import { createPutResponse, PutResponse } from './response/putResponse';
import { createRawApiResponse } from './response/rawApiResponse';
import { createResourceResponse } from './response/resourceResponse';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class RequestMaker {
  constructor() {
    throw new Error('This class constructor should be never called.');
  }

  static async get<T>(endpoint: BaseApi, action: Action, config: RequestConfig<T>): Promise<GetResponse<T>> {
    const response = axios.get<ApiResponse<T>>(endpoint.getResourcePathWithAciton(action), createConfig(endpoint, config));
    return creatGetResponse<T>(createResourceResponse(await createRawApiResponse(response)), config);
  }

  static async getById<T>(endpoint: BaseApi, action: Action, config: RequestConfig<T>, id: number): Promise<GetResponse<T>> {
    const response = axios.get<ApiResponse<T>>(`${endpoint.getResourcePathWithAciton(action)}/${id}`, createConfig(endpoint, config));
    return creatGetResponse<T>(createResourceResponse(await createRawApiResponse(response)), config);
  }

  static async post<T>(endpoint: BaseApi, action: Action, config: RequestConfig<T>, data: unknown): Promise<PostResponse<T>> {
    const response = axios.post<ApiResponse<T>>(endpoint.getResourcePathWithAciton(action), data, createConfig(endpoint, config));
    return createPostResponse<T>(createResourceResponse(await createRawApiResponse(response)), config);
  }

  static async put<T>(endpoint: BaseApi, action: Action, config: RequestConfig<T>, data: unknown): Promise<PutResponse<T>> {
    const response = axios.put<ApiResponse<T>>(endpoint.getResourcePathWithAciton(action), data, createConfig(endpoint, config));
    return createPutResponse<T>(createResourceResponse(await createRawApiResponse(response)), config);
  }

  static async delete<T>(endpoint: BaseApi, action: Action, config: RequestConfig<T>, id: number): Promise<DeleteResponse<T>> {
    const response = axios.delete<ApiResponse<T>>(`${endpoint.getResourcePathWithAciton(action)}/${id}`, createConfig(endpoint, config));
    return createDeleteResponse<T>(createResourceResponse(await createRawApiResponse(response)), config);
  }

  static async deltaSync(endpoint: BaseApi, action: Action, config: DeltaSyncRequestConfig): Promise<DeltaSyncResponse> {
    const response = axios.get<ApiResponse<unknown>>(endpoint.getResourcePathWithAciton(action), createConfig(endpoint, config));
    return createDeltaSyncResponse(await createRawApiResponse(response));
  }
}

// TODO add other stuff from config to result. Like header and client-request-id.
function createConfig(endpoint: BaseApi, config: RequestConfig<unknown>): AxiosRequestConfig {
  const result: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${endpoint.getAccessTokem()}`,
      'Content-type': 'application/json',
    },
    params: config.params,
  };

  return result;
}
