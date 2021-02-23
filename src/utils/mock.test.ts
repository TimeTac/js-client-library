import { beforeEach, describe, expect, it } from '@jest/globals';
import { createMock } from 'ts-auto-mock';

interface Interface {
  a: string;
  b: number;
}
describe('reuse', () => {
  let mock: Interface;
  beforeEach(() => {
    mock = createMock<Interface>();
  });
  it('should work', () => {
    expect(mock.a).toBe('');
  });
});
