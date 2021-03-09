import { RequestConfig } from '../configs/requestConfig';
import { createPages, Pages } from '../pages/pages';
import { ResourceResponse } from './resourceResponse';

export type GetResponse<T> = {
  data: ResourceResponse<T>;
  pages: Pages<T>;
};

export function creatGetResponse<T>(resourceResponse: ResourceResponse<T>, config: RequestConfig<T>): GetResponse<T> {
  return {
    data: resourceResponse,
    pages: createPages<T>(resourceResponse, config),
  };
}
