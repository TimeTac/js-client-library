import { createPages, Pages } from '../pages/pages';
import { RequestParams } from '../params/requestParams';
import { ResourceResponse } from './resourceResponse';

export type ReadRawResponse<T> = {
  data: ResourceResponse<T>;
  pages: Pages<T>;
};

export function createReadRawResponse<T>(resourceResponse: ResourceResponse<T>, originalParams: RequestParams<T>): ReadRawResponse<T> {
  const response: ReadRawResponse<T> = {
    data: resourceResponse,
    pages: createPages<T>(resourceResponse, originalParams),
  };

  return response;
}
