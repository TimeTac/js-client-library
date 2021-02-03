import { describe, expect, test } from '@jest/globals';

import { RequestParams } from './requestParams';

describe('RequestParams', () => {
  type Resource = {
    id: number;
    user_id: number;
    status: number;
    comment: string;
    begin: string;
    updated: string;
  };

  test('empty', () => {
    const requestParams = new RequestParams<Resource>();
    expect(requestParams.getParams()).toStrictEqual({});
  });

  test('single eq', () => {
    const requestParams = new RequestParams<Resource>().eq('id', 1);
    expect(requestParams.getParams()).toStrictEqual({ id: '1', _op__id: 'eq' });
  });

  test('double eq', () => {
    const requestParams = new RequestParams<Resource>().eq('id', 1).eq('user_id', 2);
    expect(requestParams.getParams()).toStrictEqual({ id: '1', _op__id: 'eq', user_id: '2', _op__user_id: 'eq' });
  });

  test('single neq', () => {
    const requestParams = new RequestParams<Resource>().neq('id', 1);
    expect(requestParams.getParams()).toStrictEqual({ id: '1', _op__id: 'neq' });
  });

  test('double neq', () => {
    const requestParams = new RequestParams<Resource>().neq('id', 1).neq('user_id', 2);
    expect(requestParams.getParams()).toStrictEqual({ id: '1', _op__id: 'neq', user_id: '2', _op__user_id: 'neq' });
  });

  test('limit', () => {
    const requestParams = new RequestParams<Resource>().limit(500);
    expect(requestParams.getParams()).toStrictEqual({ _limit: '500' });
  });

  test('offset', () => {
    const requestParams = new RequestParams<Resource>().offset(500);
    expect(requestParams.getParams()).toStrictEqual({ _offset: '500' });
  });

  test('between', () => {
    const requestParams = new RequestParams<Resource>().between('status', 1, 3);
    expect(requestParams.getParams()).toStrictEqual({ _op__status: 'betw', status: '1|3' });
  });

  test('gt', () => {
    const requestParams = new RequestParams<Resource>().gt('status', 1);
    expect(requestParams.getParams()).toStrictEqual({ _op__status: 'gt', status: '1' });
  });

  test('gteq', () => {
    const requestParams = new RequestParams<Resource>().gteq('status', 1);
    expect(requestParams.getParams()).toStrictEqual({ _op__status: 'gteq', status: '1' });
  });

  test('lt', () => {
    const requestParams = new RequestParams<Resource>().lt('status', 5);
    expect(requestParams.getParams()).toStrictEqual({ _op__status: 'lt', status: '5' });
  });

  test('lteq', () => {
    const requestParams = new RequestParams<Resource>().lteq('status', 5);
    expect(requestParams.getParams()).toStrictEqual({ _op__status: 'lteq', status: '5' });
  });

  test('in', () => {
    const requestParams = new RequestParams<Resource>().in('status', [5, 3]);
    expect(requestParams.getParams()).toStrictEqual({ _op__status: 'in', status: '5|3' });
  });

  test('fields', () => {
    const requestParams = new RequestParams<Resource>().fields(['status']);
    expect(requestParams.getParams()).toStrictEqual({ _fields: 'status' });
  });

  test('like', () => {
    const requestParams = new RequestParams<Resource>().like('comment', 'foo');
    expect(requestParams.getParams()).toStrictEqual({ _op__comment: 'like', comment: 'foo' });
  });

  test('orderBy asc', () => {
    const requestParams = new RequestParams<Resource>().orderBy('status', 'asc');
    expect(requestParams.getParams()).toStrictEqual({ _order_by: 'status', _order_desc: 'false' });
  });

  test('orderBy desc', () => {
    const requestParams = new RequestParams<Resource>().orderBy('status', 'desc');
    expect(requestParams.getParams()).toStrictEqual({ _order_by: 'status', _order_desc: 'true' });
  });

  test('groupBy', () => {
    const requestParams = new RequestParams<Resource>().groupBy(['status']);
    expect(requestParams.getParams()).toStrictEqual({ _group_by: 'status' });
  });

  test('aggregate', () => {
    const requestParams = new RequestParams<Resource>().aggregate('status', 'sum');
    expect(requestParams.getParams()).toStrictEqual({ _aggregate__status: 'sum' });
  });

  test('getLimit default', () => {
    const requestParams = new RequestParams<Resource>();
    expect(requestParams.getLimit()).toBe(100);
  });

  test('getLimit', () => {
    const requestParams = new RequestParams<Resource>().limit(55);
    expect(requestParams.getLimit()).toBe(55);
  });

  test('getOffset default', () => {
    const requestParams = new RequestParams<Resource>();
    expect(requestParams.getOffset()).toBe(0);
  });

  test('getOffset', () => {
    const requestParams = new RequestParams<Resource>().offset(66);
    expect(requestParams.getOffset()).toBe(66);
  });
});
