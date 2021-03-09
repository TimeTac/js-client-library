import { describe, expect, test } from '@jest/globals';

import { DeltaSyncConfigBuilder } from './deltaSyncRequestConfigBuilder';
import { RequestConfigBuilder } from './requestConfigBuilder';

describe('DeltaSyncParams', () => {
  type Resource = {
    num: number;
    str: string;
  };

  test('limit', () => {
    const deltaSyncParams = new DeltaSyncConfigBuilder().limit(500);
    expect(deltaSyncParams.build().params).toStrictEqual({ _limit: '500' });
  });

  test('offset', () => {
    const deltaSyncParams = new DeltaSyncConfigBuilder().offset(500);
    expect(deltaSyncParams.build().params).toStrictEqual({ _offset: '500' });
  });

  test('since', () => {
    const deltaSyncParams = new DeltaSyncConfigBuilder().since('time');
    expect(deltaSyncParams.build().params).toStrictEqual({ _since: 'time' });
  });

  test('include', () => {
    const deltaSyncParams = new DeltaSyncConfigBuilder().include(['tasks']);
    expect(deltaSyncParams.build().params).toStrictEqual({ _include: 'tasks' });
  });

  test('include with more', () => {
    const deltaSyncParams = new DeltaSyncConfigBuilder().include(['tasks', 'projects', 'teams']);
    expect(deltaSyncParams.build().params).toStrictEqual({ _include: 'tasks,projects,teams' });
  });

  test('getLimit default', () => {
    const deltaSyncParams = new DeltaSyncConfigBuilder();
    expect(deltaSyncParams.getLimit()).toBe(1000);
  });

  test('getLimit', () => {
    const deltaSyncParams = new DeltaSyncConfigBuilder().limit(55);
    expect(deltaSyncParams.getLimit()).toBe(55);
  });

  test('getOffset default', () => {
    const deltaSyncParams = new DeltaSyncConfigBuilder();
    expect(deltaSyncParams.getOffset()).toBe(0);
  });

  test('getOffset', () => {
    const deltaSyncParams = new DeltaSyncConfigBuilder().offset(66);
    expect(deltaSyncParams.getOffset()).toBe(66);
  });

  test('addIncludeParams', () => {
    const includeParams = new RequestConfigBuilder<Resource>().eq('num', 1).build();
    const deltaSyncParams = new DeltaSyncConfigBuilder().addIncludeParams('teams', includeParams);
    expect(deltaSyncParams.build().params).toStrictEqual({ teams__num: '1', teams___op__num: 'eq' });
  });
});
