import { expect, test, describe } from '@jest/globals';
import { RequestParams } from './requestParams';
import { PagingParams } from './pagingParams';
import { ApiResponseOnSuccess } from '../response/apiResponse';

describe('PagingParams', () => {
  type Resource = {};
  const apiResponse: ApiResponseOnSuccess<Resource[]> = {
    Success: true,
    NumResults: 6,
    Results: [{}, {}, {}, {}, {}, {}],
    RequestStartTime: 'start-time-as-iso',
  };

  test('constructor with RequestParams without next page', () => {
    const params = new RequestParams<Resource>();
    const actual = new PagingParams(params, apiResponse);

    expect(actual.isValid()).toBe(false);
    expect(() => actual.getParams()).toThrowError();
  });

  test('constructor with RequestParams with next page', () => {
    const params = new RequestParams<Resource>().limit(3);
    const actual = new PagingParams(params, apiResponse);

    expect(actual.isValid()).toBe(true);
    expect(actual.getParams()).toMatchObject({ _limit: '3' });
    expect(actual.getParams()).toMatchObject({ _offset: '3' });
  });

  test('constructor with PagingParams without next page', () => {
    const params = new RequestParams<Resource>();
    const actual = new PagingParams(new PagingParams(params, apiResponse), apiResponse);

    expect(actual.isValid()).toBe(false);
    expect(() => actual.getParams()).toThrowError();
  });

  test('constructor with PagingParams with next page', () => {
    const params = new RequestParams<Resource>().limit(3);
    const actual = new PagingParams(new PagingParams(params, apiResponse), apiResponse);

    expect(actual.isValid()).toBe(true);
    expect(actual.getParams()).toMatchObject({ _limit: '3' });
    expect(actual.getParams()).toMatchObject({ _offset: '6' });
  });
});
