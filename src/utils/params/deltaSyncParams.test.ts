import { describe, expect, test } from '@jest/globals';

import { DeltaSyncParams } from './deltaSyncParams';

describe('DeltaSyncParams', () => {
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
    expect(deltaSyncParams.get('_limit')).toBe(undefined);
  });

  test('getLimit', () => {
    const deltaSyncParams = new DeltaSyncParams().limit(55);
    expect(deltaSyncParams.get('_limit')).toBe('55');
  });

  test('getOffset default', () => {
    const deltaSyncParams = new DeltaSyncParams();
    expect(deltaSyncParams.get('_offset')).toBe(undefined);
  });

  test('getOffset', () => {
    const deltaSyncParams = new DeltaSyncParams().offset(66);
    expect(deltaSyncParams.get('_offset')).toBe('66');
  });

  test('resource', () => {
    const deltaSyncParams = new DeltaSyncParams().resource('teams', (teams) => teams.eq('name', 'a'));
    expect(deltaSyncParams.build()).toStrictEqual({ teams__name: 'a', teams___op__name: 'eq' });
  });
});
