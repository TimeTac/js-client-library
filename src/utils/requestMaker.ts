import axios, { AxiosRequestConfig } from 'axios';

import BaseApi from '../baseApi';
import { Action } from './action';
import { RequestConfig } from './configs/requestConfig';
import { ApiResponse } from './response/apiResponse';
import { createRawApiResponse } from './response/rawApiResponse';
import { createReadRawResponse, ReadRawResponse } from './response/readRawResponse';
import { createResourceResponse } from './response/resourceResponse';
import { createUpdateRawResponse, UpdateRawResponse } from './response/updateRawResponse';

function createConfig(endpoint: BaseApi, config: RequestConfig<unknown>): AxiosRequestConfig {
  const result: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${endpoint.getAccessTokem()}`,
      'Content-type': 'application/json',
    },
    params: config.params,
  };

  // TODO add other stuff from config to result. Like header and client-request-id.

  return result;
}

export async function get<T>(endpoint: BaseApi, action: Action, config?: RequestConfig<T>): Promise<ReadRawResponse<T>> {
  const response = axios.get<ApiResponse<T>>(endpoint.getResourcePathWithAciton(action), createConfig(endpoint, config));
  return createReadRawResponse<T>(createResourceResponse(await createRawApiResponse(response)), config);
}

export async function post<T>(endpoint: BaseApi, action: Action, data: unknown, config?: RequestConfig<T>): Promise<unknown> {
  const _response = axios.put<ApiResponse<T>>(endpoint.getResourcePathWithAciton(action), data, createConfig(endpoint, config));
  await _response;
  throw new Error('Implementation is missing');
}

export async function put<T>(endpoint: BaseApi, action: Action, config?: RequestConfig<T>): Promise<UpdateRawResponse<T>> {
  const response = axios.get<ApiResponse<T>>(endpoint.getResourcePathWithAciton(action), createConfig(endpoint, config));
  return createUpdateRawResponse<T>(createResourceResponse(await createRawApiResponse(response)));
}

export async function _delete<T>(endpoint: BaseApi, action: Action, data: unknown, config?: RequestConfig<T>): Promise<unknown> {
  const _response = axios.delete<ApiResponse<T>>(endpoint.getResourcePathWithAciton(action), createConfig(endpoint, config));
  await _response;
  throw new Error('Implementation is missing');
}
