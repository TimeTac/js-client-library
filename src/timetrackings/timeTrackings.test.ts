import TimeTrackings from './index';
import { TimeTracking } from './types';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import RequestParams from '../utils/requestParams/requestParams';

describe('TimeTrackings', () => {
  var timeTrackings: TimeTrackings = new TimeTrackings({});
  var readPath: string = `${timeTrackings.getResourcePath()}/read`;
  var createPath: string = `${timeTrackings.getResourcePath()}/create`;
  var updatePath: string = `${timeTrackings.getResourcePath()}/update`;
  var deletePath: string = `${timeTrackings.getResourcePath()}/delete`;
  var startPath: string = `${timeTrackings.getResourcePath()}/start`;
  var stopPath: string = `${timeTrackings.getResourcePath()}/stop`;

  var mock = new AxiosMockAdapter(axios);
  var result: Promise<TimeTracking[]> | null;
  var resultSingle: Promise<TimeTracking> | null;

  afterEach(() => {
    mock.reset();
    result = null;
    resultSingle = null;
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = timeTrackings.read();
    await result.then((result) => expect(result).toStrictEqual([{}]));
  });

  test('read with RequestParmas', async () => {
    mock.onGet(readPath, { params: { id: '99', _op__id: 'eq' } }).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = timeTrackings.read(new RequestParams<TimeTracking>().eq('id', 99));
    await result.then((result) => expect(result).toStrictEqual([{}]));
  });

  test('read with Success false', async () => {
    mock.onGet(readPath).reply(200, { Success: false });
    result = timeTrackings.read();
    await result.catch((result) => expect(result).toStrictEqual({ Success: false }));
  });

  test('read with status code 500', async () => {
    mock.onGet(readPath).reply(500);
    expect.assertions(1);
    await timeTrackings.read().catch((err) => expect(err.message).toMatch('Request failed with status code 500'));
  });

  test('readById', async () => {
    mock.onGet(`${readPath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = timeTrackings.readById(1);
    await resultSingle.then((result) => expect(result).toStrictEqual({}));
  });

  test('create', async () => {
    mock.onPost(createPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = timeTrackings.create({ task_id: 1, user_id: 1 });
    await resultSingle.then((result) => expect(result).toStrictEqual({}));
  });

  test('update', async () => {
    mock.onPut(updatePath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = timeTrackings.update({ id: 1, task_id: 1, user_id: 1 });
    await resultSingle.then((result) => expect(result).toStrictEqual({}));
  });

  test('delete', async () => {
    mock.onDelete(`${deletePath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = timeTrackings.delete(1);
    await resultSingle.then((result) => expect(result).toStrictEqual({}));
  });

  test('start', async () => {
    mock.onPost(startPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = timeTrackings.start({ task_id: 1, user_id: 1 });
    await resultSingle.then((result) => expect(result).toStrictEqual({}));
  });

  test('stop', async () => {
    mock.onPut(stopPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = timeTrackings.stop({ user_id: 1, end_time_timezone: 'foo' });
    await resultSingle.then((result) => expect(result).toStrictEqual({}));
  });
});
