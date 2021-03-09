import { RequestConfig } from '../configs/requestConfig';
import { ResourceResponse } from './resourceResponse';

export type PutResponse<T> = {
  data: ResourceResponse<T>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createPutResponse<T>(resourceResponse: ResourceResponse<T>, _config: RequestConfig<T>): PutResponse<T> {
  return {
    data: resourceResponse,
  };
}
