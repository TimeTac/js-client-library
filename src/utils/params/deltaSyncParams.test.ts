import { describe, expect, test } from '@jest/globals';

import { DeltaSyncParams } from './deltaSyncParams';

describe('DeltaSyncParams', () => {
  test('limit', () => {
    const requestParams = new DeltaSyncParams().limit(500);
    expect(requestParams.getParams()).toStrictEqual({ _limit: '500' });
  });

  test('offset', () => {
    const requestParams = new DeltaSyncParams().offset(500);
    expect(requestParams.getParams()).toStrictEqual({ _offset: '500' });
  });

  test('since', () => {
    const requestParams = new DeltaSyncParams().since('time');
    expect(requestParams.getParams()).toStrictEqual({ _since: 'time' });
  });

  test('include', () => {
    const requestParams = new DeltaSyncParams().include(['tasks']);
    expect(requestParams.getParams()).toStrictEqual({ _include: 'tasks' });
  });

  test('include with more', () => {
    const requestParams = new DeltaSyncParams().include(['tasks', 'projects', 'teams']);
    expect(requestParams.getParams()).toStrictEqual({ _include: 'tasks,projects,teams' });
  });

  test('getLimit default', () => {
    const requestParams = new DeltaSyncParams();
    expect(requestParams.getLimit()).toBe(1000);
  });

  test('getLimit', () => {
    const requestParams = new DeltaSyncParams().limit(55);
    expect(requestParams.getLimit()).toBe(55);
  });

  test('getOffset default', () => {
    const requestParams = new DeltaSyncParams();
    expect(requestParams.getOffset()).toBe(0);
  });

  test('getOffset', () => {
    const requestParams = new DeltaSyncParams().offset(66);
    expect(requestParams.getOffset()).toBe(66);
  });
});
