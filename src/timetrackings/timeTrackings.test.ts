import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { ConfigProvider } from '../utils';
import { RequestParamsBuilder } from '../utils/params/requestParams';
import { TimeTrackingsEndpoint } from './index';
import { TimeTracking } from './types';

describe('TimeTrackings', () => {
  const timeTrackings: TimeTrackingsEndpoint = new TimeTrackingsEndpoint(new ConfigProvider({ account: 'testingAccount' }));
  const readPath = `${timeTrackings.getResourcePath()}/read`;
  const createPath = `${timeTrackings.getResourcePath()}/create`;
  const updatePath = `${timeTrackings.getResourcePath()}/update`;
  const deletePath = `${timeTrackings.getResourcePath()}/delete`;
  const startPath = `${timeTrackings.getResourcePath()}/start`;
  const stopPath = `${timeTrackings.getResourcePath()}/stop`;
  const togglePath = `${timeTrackings.getResourcePath()}/toggle`;
  const timezones: { [key: string]: string } = {
    Vienna: 'Europe/Vienna',
    London: 'Europe/London',
  };

  const mock = new AxiosMockAdapter(axios);
  let result: Promise<TimeTracking[]> | null;
  let resultSingle: Promise<TimeTracking> | null;

  afterEach(() => {
    mock.reset();
    result = null;
    resultSingle = null;
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = timeTrackings.read();
    await result.then((result) => {
      expect(result).toStrictEqual([{}]);
    });
  });

  test('read with RequestParmas', async () => {
    mock.onGet(readPath, { params: { id: '99', _op__id: 'eq' } }).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = timeTrackings.read(new RequestParamsBuilder<TimeTracking>().eq('id', 99).build());
    await result.then((result) => {
      expect(result).toStrictEqual([{}]);
    });
  });

  test('read with Success false', async () => {
    mock.onGet(readPath).reply(200, { Success: false });
    result = timeTrackings.read();
    await result.catch((result) => {
      expect(result).toMatchObject({ response: { Success: false }, _plainError: { Success: false } });
    });
  });

  test('read with status code 500', async () => {
    mock.onGet(readPath).reply(500);
    expect.assertions(1);
    await timeTrackings.read().catch((err: { message: string }) => {
      expect(err.message).toMatch('Request failed with status code 500');
    });
  });

  test('readById', async () => {
    mock.onGet(`${readPath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = timeTrackings.readById(1);
    await resultSingle.then((result) => {
      expect(result).toStrictEqual({});
    });
  });

  test('create', async () => {
    mock.onPost(createPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = timeTrackings.create({ task_id: 1, user_id: 1 });
    await resultSingle.then((result) => {
      expect(result).toStrictEqual({});
    });
  });

  test('update', async () => {
    mock.onPut(updatePath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = timeTrackings.update({ id: 1, task_id: 1, user_id: 1 });
    await resultSingle.then((result) => {
      expect(result).toStrictEqual({});
    });
  });

  test('delete', async () => {
    mock.onDelete(`${deletePath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = timeTrackings.delete(1);
    await resultSingle.then((result) => {
      expect(result).toStrictEqual({});
    });
  });

  test('start', async () => {
    mock.onPost(startPath).reply(200, { Success: true, NumResults: 1, Results: [{}], Affected: [{}], _ignoreTypeGuard: true });
    const result = await timeTrackings.start({ task_id: 1, user_id: 1 });
    expect(result).toStrictEqual({
      success: true,
      apiResponse: {
        NumResults: 1,
        Results: [{}],
        Affected: [{}],
        Success: true,
        _ignoreTypeGuard: undefined,
      },
      results: [{}],
      affected: [{}],
      deleted: [],
    });
  });

  test('stop', async () => {
    mock.onPut(stopPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = timeTrackings.stop({ user_id: 1, end_time_timezone: 'foo' });
    await resultSingle.then((result) => {
      expect(result).toStrictEqual({});
    });
  });

  test('start with toggle', async () => {
    mock.onPost(togglePath).reply(200, {
      Success: true,
      NumResults: 1,
      Results: [{ start_time_timezone: timezones['Vienna'] }],
      Affected: [{}],
      _ignoreTypeGuard: true,
    });
    const result = await timeTrackings.toggle({ timezone: timezones['Vienna'], user_id: 1 });
    expect(result).toEqual({
      success: true,
      apiResponse: {
        NumResults: 1,
        Results: [{ start_time_timezone: timezones['Vienna'] }],
        Affected: [{}],
        Success: true,
        _ignoreTypeGuard: undefined,
      },
      results: [{ start_time_timezone: timezones['Vienna'] }],
      affected: [{}],
      deleted: [],
    });
  });

  test('stop with toggle', async () => {
    mock.onPost(togglePath).reply(200, {
      Success: true,
      NumResults: 1,
      Results: [{ end_time_timezone: timezones['Vienna'] }],
      Affected: [{}],
      _ignoreTypeGuard: true,
    });
    const result = await timeTrackings.toggle({ timezone: timezones['Vienna'], user_id: 1 });
    expect(result).toEqual({
      success: true,
      apiResponse: {
        NumResults: 1,
        Results: [{ end_time_timezone: timezones['Vienna'] }],
        Affected: [{}],
        Success: true,
        _ignoreTypeGuard: undefined,
      },
      results: [{ end_time_timezone: timezones['Vienna'] }],
      affected: [{}],
      deleted: [],
    });
  });
});
