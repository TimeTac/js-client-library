import { describe, expect, test } from '@jest/globals';

import { DeltaSyncParams } from './deltaSyncParams';
import { RequestParamsBuilder } from './requestParams';

describe('DeltaSyncParams', () => {
  type Resource = {
    num: number;
    str: string;
  };

  test('limit', () => {
    const deltaSyncParams = new DeltaSyncParams().limit(500);
    expect(deltaSyncParams.build()).toStrictEqual({ _limit: '500' });
  });

  test('offset', () => {
    const deltaSyncParams = new DeltaSyncParams().offset(500);
    expect(deltaSyncParams.build()).toStrictEqual({ _offset: '500' });
  });

  test('since', () => {
    const deltaSyncParams = new DeltaSyncParams().since('time');
    expect(deltaSyncParams.build()).toStrictEqual({ _since: 'time' });
  });

  test('include', () => {
    const deltaSyncParams = new DeltaSyncParams().include(['tasks']);
    expect(deltaSyncParams.build()).toStrictEqual({ _include: 'tasks' });
  });

  test('include with more', () => {
    const deltaSyncParams = new DeltaSyncParams().include(['tasks', 'projects', 'teams']);
    expect(deltaSyncParams.build()).toStrictEqual({ _include: 'tasks,projects,teams' });
  });

  test('getLimit default', () => {
    const deltaSyncParams = new DeltaSyncParams();
    expect(deltaSyncParams.getLimit()).toBe(1000);
  });

  test('getLimit', () => {
    const deltaSyncParams = new DeltaSyncParams().limit(55);
    expect(deltaSyncParams.getLimit()).toBe(55);
  });

  test('getOffset default', () => {
    const deltaSyncParams = new DeltaSyncParams();
    expect(deltaSyncParams.getOffset()).toBe(0);
  });

  test('getOffset', () => {
    const deltaSyncParams = new DeltaSyncParams().offset(66);
    expect(deltaSyncParams.getOffset()).toBe(66);
  });

  test('addIncludeParams', () => {
    const includeParams = new RequestParamsBuilder<Resource>().eq('num', 1).build();
    const deltaSyncParams = new DeltaSyncParams().addIncludeParams('teams', includeParams);
    expect(deltaSyncParams.build()).toStrictEqual({ teams__num: '1', teams___op__num: 'eq' });
  });
});
