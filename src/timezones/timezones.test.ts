import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { ConfigProvider } from '../utils';
import { RequestParamsBuilder } from '../utils/params/requestParams';
import { TimezonesEndpoint } from './index';
import { Timezone } from './types';

describe('Timezones', () => {
  const timezones: TimezonesEndpoint = new TimezonesEndpoint(new ConfigProvider({ account: 'testingAccount' }));
  const readPath = `${timezones.getResourcePath()}/read`;

  const mock = new AxiosMockAdapter(axios);
  let result: Promise<Timezone[]> | null;

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = timezones.read();
    await result.then((result) => {
      expect(result).toStrictEqual([{}]);
    });
  });

  test('read with RequestParmas', async () => {
    mock.onGet(readPath, { params: { id: '99', _op__id: 'eq' } }).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = timezones.read(new RequestParamsBuilder<Timezone>().eq('id', 99).build());
    await result.then((result) => {
      expect(result).toStrictEqual([{}]);
    });
  });
});
