import { createPages, Pages } from '../pages/pages';
import { RequestParams } from '../params/requestParams';
import { ApiResponse } from './apiResponse';

export type ApiResponseWithPages<R, A = unknown> = ApiResponse<R, A> & {
  pages: Pages<R>;
};

export function createApiResponseWithPages<R, A>(
  apiResponse: ApiResponse<R, A>,
  originalParams: RequestParams<R>
): ApiResponseWithPages<R, A> {
  return {
    ...apiResponse,
    pages: createPages<R>(apiResponse, originalParams),
  };
}
