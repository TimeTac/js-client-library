import { PagingParams } from '../params/pagingParams';
import { RequestParams } from '../params/requestParams';
import { RequestPromise, toApiResponse } from './responseHandlers';

export type ResourceResponse<T> = {
  success: boolean;
  status?: number;
  results: T[];
  // TODO deleted: deltedEntry[];
  //          id	integer
  //          deleted_at	string
  startTime: string;
  requestParams: RequestParams<T>;
  prevPage?: PagingParams<T>;
  currentPage?: PagingParams<T>;
  nextPage?: PagingParams<T>;
};

export async function createResourceResponse<T>(promise: RequestPromise<T[]>, params: RequestParams<T>): Promise<ResourceResponse<T>> {
  const apiResponse = await toApiResponse<T[]>(promise);

  const response: ResourceResponse<T> = {
    success: true,
    results: apiResponse.Results,
    startTime: apiResponse.RequestStartTime,
    requestParams: params,
    nextPage: new PagingParams<T>(params, apiResponse),
  };

  return response;
}
