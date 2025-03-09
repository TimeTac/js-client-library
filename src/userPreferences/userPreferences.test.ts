import axios from 'axios';
import { expect } from '@jest/globals';
import AxiosMockAdapter from 'axios-mock-adapter';
import { ConfigProvider } from '../utils';
import { UserPreferencesEndpoint } from './index';

const mockResponseData = {
  userPreferences: [
    {
      id: 1,
      key: 'theme',
      value: 'dark',
    },
  ],
};

describe('UserPreferencesEndpoint', () => {
  const userPreferences = new UserPreferencesEndpoint(new ConfigProvider({ account: 'testingAccount' }));
  const mock = new AxiosMockAdapter(axios);
  const readPath = `${userPreferences.getResourcePath()}/read`;

  afterEach(() => {
    mock.reset();
  });

  test('read - success', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: mockResponseData.userPreferences });
    const results = await userPreferences.read();
    expect(results).toStrictEqual({
      Results: mockResponseData.userPreferences,
      Affected: {},
      Deleted: {},
    });
  });
});
