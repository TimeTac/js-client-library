import { RequestParams } from '../params/requestParams';
import { ResourceResponse } from '../response/resourceResponse';

export type Pages<T> = {
  prev?: RequestParams<T>;
  current?: RequestParams<T>;
  next?: RequestParams<T>;
  // TODO add the first params of the paging action
  // TODO add first requestStartTime
};

export function createPages<T>(resourceResponse: ResourceResponse<T>, originalParams: RequestParams<T>): Pages<T> {
  const pages: Pages<T> = {
    prev: new RequestParams<T>().clone(originalParams),
    current: new RequestParams<T>().clone(originalParams),
    next: new RequestParams<T>().clone(originalParams),
  };

  if (!pages.prev || pages.prev.getOffset() < pages.prev.getLimit()) {
    pages.prev = undefined;
  } else {
    pages.prev.offset(pages.prev.getOffset() - pages.prev.getLimit());
  }

  if (!pages.next || resourceResponse.results.length < pages.next.getLimit()) {
    pages.next = undefined;
  } else {
    pages.next.offset(pages.next.getOffset() + pages.next.getLimit());
  }

  return pages;
}
