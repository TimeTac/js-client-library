import { RequestParams } from '../params/requestParams';
import { ResourceResponse } from '../response/resourceResponse';

export type Pages<T> = {
  prev?: RequestParams<T>;
  current?: RequestParams<T>;
  next?: RequestParams<T>;
  // TODO add orinalparams
  // TODO add first requestStartTime here
};

export function createPages<T>(resourceResponse: ResourceResponse<T>, originalParams: RequestParams<T>): Pages<T> {
  let pages: Pages<T> = {
    prev: Object.assign(new RequestParams<T>(), originalParams),
    current: Object.assign(new RequestParams<T>(), originalParams),
    next: Object.assign(new RequestParams<T>(), originalParams),
  };

  if (originalParams.getOffset() < originalParams.getLimit()) {
    pages.prev = undefined;
  } else {
    pages.prev?.offset(originalParams.getOffset() - originalParams.getLimit());
  }

  if (resourceResponse.results.length < originalParams.getLimit()) {
    pages.next = undefined;
  } else {
    pages.next?.offset(originalParams.getOffset() + originalParams.getLimit());
  }

  return pages;
}
