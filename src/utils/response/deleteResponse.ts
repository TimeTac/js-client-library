import { RequestConfig } from '../configs/requestConfig';
import { ResourceResponse } from './resourceResponse';

export type DeleteResponse<T> = {
  data: ResourceResponse<T>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createDeleteResponse<T>(resourceResponse: ResourceResponse<T>, _config: RequestConfig<T>): DeleteResponse<T> {
  return {
    data: resourceResponse,
  };
}
