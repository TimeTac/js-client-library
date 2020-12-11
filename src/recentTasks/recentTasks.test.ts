import RecentTasksEndpoint from './index';
import { RecentTask } from './types';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { ApiResponseOnSuccess } from '../utils/response/apiResponse';
import RequestParams from '../utils/requestParams/requestParams';

describe('RecentTasks', () => {
  var recentTasksEndpoint: RecentTasksEndpoint = new RecentTasksEndpoint({});
  var readPath: string = `${recentTasksEndpoint.getResourcePath()}/read`;
  var createPath: string = `${recentTasksEndpoint.getResourcePath()}/create`;
  var deletePath: string = `${recentTasksEndpoint.getResourcePath()}/delete`;
  var mock = new AxiosMockAdapter(axios);
  var result: Promise<RecentTask[]> | null;
  var resultSingle: Promise<RecentTask> | null;
  var resultRaw: Promise<ApiResponseOnSuccess<RecentTask[]>> | null;

  afterEach(() => {
    mock.reset();
    result = null;
    resultSingle = null;
    resultRaw = null;
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = recentTasksEndpoint.read();
    await result.then((result) => expect(result).toStrictEqual([{}]));
  });

  test('read with Success false', async () => {
    mock.onGet(readPath).reply(200, { Success: false });
    result = recentTasksEndpoint.read();
    await result.catch((result) => expect(result).toStrictEqual({ Success: false }));
  });

  test('read with status code 500', async () => {
    mock.onGet(readPath).reply(500);
    expect.assertions(1);
    await recentTasksEndpoint.read().catch((err) => expect(err.message).toMatch('Request failed with status code 500'));
  });

  test('read with RequestParmas', async () => {
    mock.onGet(readPath, { id: 1 }).reply(200, { Success: true, NumResults: 1, Results: [{ id: 1, node_id: 2, user_id: 3 }] });

    result = recentTasksEndpoint.read(new RequestParams<RecentTask>().eq('id', 1));
    await result.then((result) => expect(result).toStrictEqual([{ id: 1, node_id: 2, user_id: 3 }]));
  });

  test('readById', async () => {
    mock.onGet(`${readPath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{ id: 1 }] });
    resultSingle = recentTasksEndpoint.readById(1);
    await resultSingle.then((result) => expect(result).toStrictEqual({ id: 1 }));
  });

  test('create', async () => {
    const results = { id: 1, node_id: 2, user_id: 3 };
    const data = { node_id: 2, user_id: 3 };

    mock.onPost(createPath, data).reply(200, { Success: true, NumResults: 1, Results: [results] });
    resultSingle = recentTasksEndpoint.create({ node_id: 2, user_id: 3 });

    await resultSingle.then((result) => expect(result).toStrictEqual(results));
  });

  test('delete', async () => {
    mock.onDelete(`${deletePath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = recentTasksEndpoint.delete(1);
    await resultSingle.then((result) => expect(result).toStrictEqual({}));
  });
});
