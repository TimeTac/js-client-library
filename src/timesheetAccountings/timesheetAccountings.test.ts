import TimesheetAccountings from './index';
import { TimesheetAccounting } from './types';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import RequestParams from '../utils/requestParams/requestParams';

describe('TimesheetAccountings', () => {
  var timesheetAccountings: TimesheetAccountings = new TimesheetAccountings({});
  var readPath: string = `${timesheetAccountings.getResourcePath()}/read`;
  var mock = new AxiosMockAdapter(axios);
  var result: Promise<TimesheetAccounting[]>;

  afterEach(() => {
    mock.reset();
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = timesheetAccountings.read();
    await result.then((result) => expect(result).toStrictEqual([{}]));
  });

  test('read with Success false', async () => {
    mock.onGet(readPath).reply(200, { Success: false });
    result = timesheetAccountings.read();
    await result.catch((result) => expect(result).toStrictEqual({ Success: false }));
  });

  test('read with status code 500', async () => {
    mock.onGet(readPath).reply(500);
    expect.assertions(1);
    await timesheetAccountings.read().catch((err) => expect(err.message).toMatch('Request failed with status code 500'));
  });
});
