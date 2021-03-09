import { RequestConfig } from '../configs/requestConfig';
import { RequestConfigBuilder } from '../configs/requestConfigBuilder';
import { ResourceResponse } from '../response/resourceResponse';

export type Pages<T> = {
  prev?: RequestConfig<T>;
  current?: RequestConfig<T>;
  next?: RequestConfig<T>;
  // TODO add the first params of the paging action
  // TODO add first requestStartTime
};

export function createPages<T>(resourceResponse: ResourceResponse<T>, originalconfig: RequestConfig<T>): Pages<T> {
  const currentBuilder = RequestConfigBuilder.from(originalconfig);
  const pages: Pages<T> = { current: currentBuilder.build() };

  if (currentBuilder.getOffset() >= currentBuilder.getLimit()) {
    const prevBuilder = RequestConfigBuilder.from(originalconfig).offset(currentBuilder.getOffset() - currentBuilder.getLimit());
    pages.prev = prevBuilder.build();
  }

  if (resourceResponse.results.length >= currentBuilder.getLimit()) {
    const nextBuilder = RequestConfigBuilder.from(originalconfig).offset(currentBuilder.getOffset() + currentBuilder.getLimit());
    pages.next = nextBuilder.build();
  }

  return pages;
}
