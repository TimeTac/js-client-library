import { createPages, Pages } from '../pages/pages';
import { RequestParams } from '../params/requestParamBuilder';
import { ResourceResponse } from './resourceResponse';

export type ReadRawResponse<T> = {
  data: ResourceResponse<T>;
  pages: Pages<T>;
};

export function createReadRawResponse<T>(resourceResponse: ResourceResponse<T>, originalParams: RequestParams<T>): ReadRawResponse<T> {
  return {
    data: resourceResponse,
    pages: createPages<T>(resourceResponse, originalParams),
  };
}
