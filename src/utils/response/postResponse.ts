import { RequestConfig } from '../configs/requestConfig';
import { ResourceResponse } from './resourceResponse';

export type PostResponse<T> = {
  data: ResourceResponse<T>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createPostResponse<T>(resourceResponse: ResourceResponse<T>, _config: RequestConfig<T>): PostResponse<T> {
  return {
    data: resourceResponse,
  };
}
