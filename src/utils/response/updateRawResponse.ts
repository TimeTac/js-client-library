import { ResourceResponse } from './resourceResponse';

export type UpdateRawResponse<T> = {
  data: ResourceResponse<T>;
};

export function createUpdateRawResponse<T>(resourceResponse: ResourceResponse<T>): UpdateRawResponse<T> {
  return {
    data: resourceResponse,
  };
}
