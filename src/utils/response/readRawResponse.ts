import { RequestConfig } from '../configs/requestConfig';
import { createPages, Pages } from '../pages/pages';
import { ResourceResponse } from './resourceResponse';

export type ReadRawResponse<T> = {
  data: ResourceResponse<T>;
  pages: Pages<T>;
};

export function createReadRawResponse<T>(resourceResponse: ResourceResponse<T>, originalconfig: RequestConfig<T>): ReadRawResponse<T> {
  return {
    data: resourceResponse,
    pages: createPages<T>(resourceResponse, originalconfig),
  };
}
