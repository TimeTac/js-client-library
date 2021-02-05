import { RequestParamBuilder, RequestParams } from '../params/requestParamBuilder';
import { ResourceResponse } from '../response/resourceResponse';

export type Pages<T> = {
  prev?: RequestParams<T>;
  current?: RequestParams<T>;
  next?: RequestParams<T>;
  // TODO add the first params of the paging action
  // TODO add first requestStartTime
};

export function createPages<T>(resourceResponse: ResourceResponse<T>, originalParams: RequestParams<T>): Pages<T> {
  let pages: Pages<T> = {
    prev: { ...originalParams },
    current: { ...originalParams },
    next: { ...originalParams },
  };

  const prev = new RequestParamBuilder(pages.prev);
  const next = new RequestParamBuilder(pages.next);

  if (!pages.prev || prev.getOffset() < prev.getLimit()) {
    pages.prev = undefined;
  } else {
    prev.offset(prev.getOffset() - prev.getLimit());
  }

  if (!pages.next || resourceResponse.results.length < next.getLimit()) {
    pages.next = undefined;
  } else {
    next.offset(next.getOffset() + next.getLimit());
  }

  return pages;
}
