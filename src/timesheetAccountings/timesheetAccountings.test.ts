import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { ConfigProvider } from '../utils';
import { TimesheetAccountingsEndpoint } from './index';
import { TimesheetAccounting } from './types';

describe('TimesheetAccountings', () => {
  const timesheetAccountings: TimesheetAccountingsEndpoint = new TimesheetAccountingsEndpoint(
    new ConfigProvider({ account: 'testingAccount' })
  );
  const readPath = `${timesheetAccountings.getResourcePath()}/read`;

  const mock = new AxiosMockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    const result: Promise<TimesheetAccounting[]> = timesheetAccountings.read();
    await result.then((result) => {
      expect(result).toStrictEqual([{}]);
    });
  });

  test('read with Success false', async () => {
    mock.onGet(readPath).reply(200, { Success: false });
    const result: Promise<TimesheetAccounting[]> = timesheetAccountings.read();
    await result.catch((result) => {
      expect(result).toStrictEqual({ Success: false });
    });
  });

  test('read with status code 500', async () => {
    mock.onGet(readPath).reply(500);
    expect.assertions(1);
    await timesheetAccountings.read().catch((err: { message: string }) => {
      expect(err.message).toMatch('Request failed with status code 500');
    });
  });
});
