import axios from 'axios';
import { expect } from '@jest/globals';
import AxiosMockAdapter from 'axios-mock-adapter';
import { ConfigProvider } from '../utils';
import { UserHistoryEndpoint } from './';

const mockResponseData = [
  {
    id: 123,
    user_id: 456,
    change_user_id: 789,
    change_date: '2024-09-17 14:41:33',
    change_type: 'department_id_valid_from',
    old_value: '0000-00-00',
    new_value: '2024-09-17',
  },
];

describe('UserHistoryEndpoint', () => {
  const userHistory = new UserHistoryEndpoint(new ConfigProvider({ account: 'testingAccount' }));
  const mock = new AxiosMockAdapter(axios);
  const readPath = `${userHistory.getResourcePath()}/read`;

  afterEach(() => {
    mock.reset();
  });

  test('read - success', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: mockResponseData });
    const results = await userHistory.read();
    expect(results).toStrictEqual({
      Results: mockResponseData,
      Affected: {},
      Deleted: {},
    });
  });
});
