import axios, { AxiosRequestConfig } from 'axios';

import BaseApi from '../baseApi';
import { Action } from './action';
import { RequestConfig } from './configs/requestConfig';
import { ApiResponse } from './response/apiResponse';
import { createRawApiResponse } from './response/rawApiResponse';
import { createReadRawResponse, ReadRawResponse } from './response/readRawResponse';
import { createResourceResponse } from './response/resourceResponse';
import { createUpdateRawResponse, UpdateRawResponse } from './response/updateRawResponse';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class RequestMaker {
  constructor() {
    throw new Error('This calls has no constructor');
  }

  static async get<T>(endpoint: BaseApi, action: Action, config: RequestConfig<T>): Promise<ReadRawResponse<T>> {
    const response = axios.get<ApiResponse<T>>(endpoint.getResourcePathWithAciton(action), createConfig(endpoint, config));
    return createReadRawResponse<T>(createResourceResponse(await createRawApiResponse(response)), config);
  }

  static async getById<T>(endpoint: BaseApi, action: Action, config: RequestConfig<T>, id: number): Promise<ReadRawResponse<T>> {
    const response = axios.get<ApiResponse<T>>(`${endpoint.getResourcePathWithAciton(action)}/${id}`, createConfig(endpoint, config));
    return createReadRawResponse<T>(createResourceResponse(await createRawApiResponse(response)), config);
  }

  static async post<T>(endpoint: BaseApi, action: Action, config: RequestConfig<T>, data: unknown): Promise<unknown> {
    const _response = axios.post<ApiResponse<T>>(endpoint.getResourcePathWithAciton(action), data, createConfig(endpoint, config));
    await _response;
    throw new Error('Implementation is missing');
  }

  static async put<T>(endpoint: BaseApi, action: Action, config: RequestConfig<T>, data: unknown): Promise<UpdateRawResponse<T>> {
    const response = axios.put<ApiResponse<T>>(endpoint.getResourcePathWithAciton(action), data, createConfig(endpoint, config));
    return createUpdateRawResponse<T>(createResourceResponse(await createRawApiResponse(response)));
  }

  static async delete<T>(endpoint: BaseApi, action: Action, config: RequestConfig<T>): Promise<unknown> {
    const _response = axios.delete<ApiResponse<T>>(endpoint.getResourcePathWithAciton(action), createConfig(endpoint, config));
    await _response;
    throw new Error('Implementation is missing');
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
