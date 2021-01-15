import { PagingParams } from '../params/pagingParams';
import { RequestParams } from '../params/requestParams';
import { RequestPromise, toApiResponse } from './responseHandlers';

export type Response<T> = {
  success: boolean;
  status?: number;
  results: T[];
  startTime: string;
  requestParams: RequestParams<T>;
  prevPage?: PagingParams<T>;
  currentPage?: PagingParams<T>;
  nextPage?: PagingParams<T>;
};

export async function createResponse<T>(promise: RequestPromise<T[]>, params: RequestParams<T>): Promise<Response<T>> {
  const apiResponse = await toApiResponse<T[]>(promise);

  const response: Response<T> = {
    success: true,
    results: apiResponse.Results,
    startTime: apiResponse.RequestStartTime,
    requestParams: params,
    nextPage: new PagingParams<T>(params, apiResponse),
  };

  return response;
}
