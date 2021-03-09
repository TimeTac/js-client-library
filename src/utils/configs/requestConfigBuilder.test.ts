import { describe, expect, test } from '@jest/globals';

import { RequestConfigBuilder } from './requestConfigBuilder';

describe('RequestParamsBuilder', () => {
  type Resource = {
    id: number;
    user_id: number;
    status: number;
    comment: string;
    begin: string;
    updated: string;
  };

  test('empty', () => {
    const requestParams = new RequestConfigBuilder<Resource>();
    expect(requestParams.build().params).toStrictEqual({});
  });

  test('single eq', () => {
    const requestParams = new RequestConfigBuilder<Resource>().eq('id', 1);
    expect(requestParams.build().params).toStrictEqual({ id: '1', _op__id: 'eq' });
  });

  test('double eq', () => {
    const requestParams = new RequestConfigBuilder<Resource>().eq('id', 1).eq('user_id', 2);
    expect(requestParams.build().params).toStrictEqual({ id: '1', _op__id: 'eq', user_id: '2', _op__user_id: 'eq' });
  });

  test('single neq', () => {
    const requestParams = new RequestConfigBuilder<Resource>().neq('id', 1);
    expect(requestParams.build().params).toStrictEqual({ id: '1', _op__id: 'neq' });
  });

  test('double neq', () => {
    const requestParams = new RequestConfigBuilder<Resource>().neq('id', 1).neq('user_id', 2);
    expect(requestParams.build().params).toStrictEqual({ id: '1', _op__id: 'neq', user_id: '2', _op__user_id: 'neq' });
  });

  test('limit', () => {
    const requestParams = new RequestConfigBuilder<Resource>().limit(500);
    expect(requestParams.build().params).toStrictEqual({ _limit: '500' });
  });

  test('offset', () => {
    const requestParams = new RequestConfigBuilder<Resource>().offset(500);
    expect(requestParams.build().params).toStrictEqual({ _offset: '500' });
  });

  test('between', () => {
    const requestParams = new RequestConfigBuilder<Resource>().between('status', 1, 3);
    expect(requestParams.build().params).toStrictEqual({ _op__status: 'betw', status: '1|3' });
  });

  test('gt', () => {
    const requestParams = new RequestConfigBuilder<Resource>().gt('status', 1);
    expect(requestParams.build().params).toStrictEqual({ _op__status: 'gt', status: '1' });
  });

  test('gteq', () => {
    const requestParams = new RequestConfigBuilder<Resource>().gteq('status', 1);
    expect(requestParams.build().params).toStrictEqual({ _op__status: 'gteq', status: '1' });
  });

  test('lt', () => {
    const requestParams = new RequestConfigBuilder<Resource>().lt('status', 5);
    expect(requestParams.build().params).toStrictEqual({ _op__status: 'lt', status: '5' });
  });

  test('lteq', () => {
    const requestParams = new RequestConfigBuilder<Resource>().lteq('status', 5);
    expect(requestParams.build().params).toStrictEqual({ _op__status: 'lteq', status: '5' });
  });

  test('in', () => {
    const requestParams = new RequestConfigBuilder<Resource>().in('status', [5, 3]);
    expect(requestParams.build().params).toStrictEqual({ _op__status: 'in', status: '5|3' });
  });

  test('nin', () => {
    const requestParams = new RequestConfigBuilder<Resource>().nin('status', [5, 3]);
    expect(requestParams.build().params).toStrictEqual({ _op__status: 'nin', status: '5|3' });
  });

  test('fields', () => {
    const requestParams = new RequestConfigBuilder<Resource>().fields(['status']);
    expect(requestParams.build().params).toStrictEqual({ _fields: 'status' });
  });

  test('like', () => {
    const requestParams = new RequestConfigBuilder<Resource>().like('comment', 'foo');
    expect(requestParams.build().params).toStrictEqual({ _op__comment: 'like', comment: 'foo' });
  });

  test('orderBy asc', () => {
    const requestParams = new RequestConfigBuilder<Resource>().orderBy('status', 'asc');
    expect(requestParams.build().params).toStrictEqual({ _order_by: 'status', _order_desc: 'false' });
  });

  test('orderBy desc', () => {
    const requestParams = new RequestConfigBuilder<Resource>().orderBy('status', 'desc');
    expect(requestParams.build().params).toStrictEqual({ _order_by: 'status', _order_desc: 'true' });
  });

  test('groupBy', () => {
    const requestParams = new RequestConfigBuilder<Resource>().groupBy(['status']);
    expect(requestParams.build().params).toStrictEqual({ _group_by: 'status' });
  });

  test('aggregate', () => {
    const requestParams = new RequestConfigBuilder<Resource>().aggregate('status', 'sum');
    expect(requestParams.build().params).toStrictEqual({ _aggregate__status: 'sum' });
  });

  test('getLimit default', () => {
    const requestParams = new RequestConfigBuilder<Resource>();
    expect(requestParams.getLimit()).toBe(100);
  });

  test('getLimit', () => {
    const requestParams = new RequestConfigBuilder<Resource>().limit(55);
    expect(requestParams.getLimit()).toBe(55);
  });

  test('getOffset default', () => {
    const requestParams = new RequestConfigBuilder<Resource>();
    expect(requestParams.getOffset()).toBe(0);
  });

  test('getOffset', () => {
    const requestParams = new RequestConfigBuilder<Resource>().offset(66);
    expect(requestParams.getOffset()).toBe(66);
  });

  test('Two builder operating on the same requestParams share the same requestParams', () => {
    const before = new RequestConfigBuilder<Resource>().eq('id', 1);
    const after = new RequestConfigBuilder<Resource>(before.build());

    expect(after.build()).toStrictEqual(before.build());

    before.limit(500);

    expect(before.build()).toMatchObject(after.build());
    expect(after.build()).toStrictEqual(before.build());
  });
});
