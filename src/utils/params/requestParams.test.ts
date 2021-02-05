import { describe, expect, test } from '@jest/globals';

import { RequestParamBuilder } from './requestParamBuilder';

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
    const requestParams = new RequestParamBuilder<Resource>();
    expect(requestParams.build()).toStrictEqual({});
  });

  test('single eq', () => {
    const requestParams = new RequestParamBuilder<Resource>().eq('id', 1);
    expect(requestParams.build()).toStrictEqual({ id: '1', _op__id: 'eq' });
  });

  test('double eq', () => {
    const requestParams = new RequestParamBuilder<Resource>().eq('id', 1).eq('user_id', 2);
    expect(requestParams.build()).toStrictEqual({ id: '1', _op__id: 'eq', user_id: '2', _op__user_id: 'eq' });
  });

  test('single neq', () => {
    const requestParams = new RequestParamBuilder<Resource>().neq('id', 1);
    expect(requestParams.build()).toStrictEqual({ id: '1', _op__id: 'neq' });
  });

  test('double neq', () => {
    const requestParams = new RequestParamBuilder<Resource>().neq('id', 1).neq('user_id', 2);
    expect(requestParams.build()).toStrictEqual({ id: '1', _op__id: 'neq', user_id: '2', _op__user_id: 'neq' });
  });

  test('limit', () => {
    const requestParams = new RequestParamBuilder<Resource>().limit(500);
    expect(requestParams.build()).toStrictEqual({ _limit: '500' });
  });

  test('offset', () => {
    const requestParams = new RequestParamBuilder<Resource>().offset(500);
    expect(requestParams.build()).toStrictEqual({ _offset: '500' });
  });

  test('between', () => {
    const requestParams = new RequestParamBuilder<Resource>().between('status', 1, 3);
    expect(requestParams.build()).toStrictEqual({ _op__status: 'betw', status: '1|3' });
  });

  test('gt', () => {
    const requestParams = new RequestParamBuilder<Resource>().gt('status', 1);
    expect(requestParams.build()).toStrictEqual({ _op__status: 'gt', status: '1' });
  });

  test('gteq', () => {
    const requestParams = new RequestParamBuilder<Resource>().gteq('status', 1);
    expect(requestParams.build()).toStrictEqual({ _op__status: 'gteq', status: '1' });
  });

  test('lt', () => {
    const requestParams = new RequestParamBuilder<Resource>().lt('status', 5);
    expect(requestParams.build()).toStrictEqual({ _op__status: 'lt', status: '5' });
  });

  test('lteq', () => {
    const requestParams = new RequestParamBuilder<Resource>().lteq('status', 5);
    expect(requestParams.build()).toStrictEqual({ _op__status: 'lteq', status: '5' });
  });

  test('in', () => {
    const requestParams = new RequestParamBuilder<Resource>().in('status', [5, 3]);
    expect(requestParams.build()).toStrictEqual({ _op__status: 'in', status: '5|3' });
  });

  test('nin', () => {
    const requestParams = new RequestParamBuilder<Resource>().nin('status', [5, 3]);
    expect(requestParams.build()).toStrictEqual({ _op__status: 'nin', status: '5|3' });
  });

  test('fields', () => {
    const requestParams = new RequestParamBuilder<Resource>().fields(['status']);
    expect(requestParams.build()).toStrictEqual({ _fields: 'status' });
  });

  test('like', () => {
    const requestParams = new RequestParamBuilder<Resource>().like('comment', 'foo');
    expect(requestParams.build()).toStrictEqual({ _op__comment: 'like', comment: 'foo' });
  });

  test('orderBy asc', () => {
    const requestParams = new RequestParamBuilder<Resource>().orderBy('status', 'asc');
    expect(requestParams.build()).toStrictEqual({ _order_by: 'status', _order_desc: 'false' });
  });

  test('orderBy desc', () => {
    const requestParams = new RequestParamBuilder<Resource>().orderBy('status', 'desc');
    expect(requestParams.build()).toStrictEqual({ _order_by: 'status', _order_desc: 'true' });
  });

  test('groupBy', () => {
    const requestParams = new RequestParamBuilder<Resource>().groupBy(['status']);
    expect(requestParams.build()).toStrictEqual({ _group_by: 'status' });
  });

  test('aggregate', () => {
    const requestParams = new RequestParamBuilder<Resource>().aggregate('status', 'sum');
    expect(requestParams.build()).toStrictEqual({ _aggregate__status: 'sum' });
  });

  test('getLimit default', () => {
    const requestParams = new RequestParamBuilder<Resource>();
    expect(requestParams.getLimit()).toBe(100);
  });

  test('getLimit', () => {
    const requestParams = new RequestParamBuilder<Resource>().limit(55);
    expect(requestParams.getLimit()).toBe(55);
  });

  test('getOffset default', () => {
    const requestParams = new RequestParamBuilder<Resource>();
    expect(requestParams.getOffset()).toBe(0);
  });

  test('getOffset', () => {
    const requestParams = new RequestParamBuilder<Resource>().offset(66);
    expect(requestParams.getOffset()).toBe(66);
  });

  test('Two builder operating on the same requestParams share the same requestParams', () => {
    const before = new RequestParamBuilder<Resource>().eq('id', 1);
    const after = new RequestParamBuilder<Resource>(before.build());

    expect(after.build()).toStrictEqual(before.build());

    before.limit(500);

    expect(before.build()).toMatchObject(after.build());
    expect(after.build()).toStrictEqual(before.build());
  });
});
