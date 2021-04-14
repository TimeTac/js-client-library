import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { ConfigProvider } from '../utils';
import { UserDefinedFieldDefinitionOptionsEndpoint } from './index';
import { UserDefinedFieldDefinitionOptions } from './types';

describe('User defined field definition options', () => {
  const userDefinedFieldDefinitionOptions = new UserDefinedFieldDefinitionOptionsEndpoint(
    new ConfigProvider({ account: 'testingAccount' })
  );

  const readPath = `${userDefinedFieldDefinitionOptions.getResourcePath()}/read`;

  const mock = new AxiosMockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    const result: UserDefinedFieldDefinitionOptions[] = await userDefinedFieldDefinitionOptions.read();
    expect(result).toStrictEqual([{}]);
  });

  test('read with Success false', async () => {
    mock.onGet(readPath).reply(200, { Success: false });
    await userDefinedFieldDefinitionOptions.read().catch((result) => {
      expect(result).toStrictEqual({ Success: false });
    });
  });

  test('read with status code 500', async () => {
    mock.onGet(readPath).reply(500);
    expect.assertions(1);
    await userDefinedFieldDefinitionOptions.read().catch((err: { message: string }) => {
      expect(err.message).toMatch('Request failed with status code 500');
    });
  });
});
