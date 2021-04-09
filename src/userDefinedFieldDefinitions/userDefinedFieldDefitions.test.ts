import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { ConfigProvider } from '../utils';
import { UserDefinedFieldDefinitionsEndpoint } from './index';
import { UserDefinedFieldDefinitions } from './types';

describe('User defined field definitions', () => {
  const userDefinedFieldDefinitions = new UserDefinedFieldDefinitionsEndpoint(new ConfigProvider({ account: 'testingAccount' }));

  const readPath = `${userDefinedFieldDefinitions.getResourcePath()}/read`;

  const mock = new AxiosMockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    const result: UserDefinedFieldDefinitions[] = await userDefinedFieldDefinitions.read();
    expect(result).toStrictEqual([{}]);
  });

  test('read with Success false', async () => {
    mock.onGet(readPath).reply(200, { Success: false });
    await userDefinedFieldDefinitions.read().catch((result) => {
      expect(result).toStrictEqual({ Success: false });
    });
  });

  test('read with status code 500', async () => {
    mock.onGet(readPath).reply(500);
    expect.assertions(1);
    await userDefinedFieldDefinitions.read().catch((err: { message: string }) => {
      expect(err.message).toMatch('Request failed with status code 500');
    });
  });
});
