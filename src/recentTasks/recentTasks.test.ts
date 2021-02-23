import { afterEach, describe, expect, test } from '@jest/globals';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { RequestParamsBuilder } from '../utils/params/requestParams';
import { RecentTasksEndpoint } from './index';
import { RecentTask } from './types';

describe('RecentTasks', () => {
  const recentTasksEndpoint: RecentTasksEndpoint = new RecentTasksEndpoint({ account: 'testingAccount' });
  const readPath: string = `${recentTasksEndpoint.getResourcePath()}/read`;

  const mock = new AxiosMockAdapter(axios);
  let result: Promise<RecentTask[]> | null;
  let resultSingle: Promise<RecentTask> | null;

  afterEach(() => {
    mock.reset();
    result = null;
    resultSingle = null;
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

    result = recentTasksEndpoint.read(new RequestParamsBuilder<RecentTask>().eq('id', 1).build());
    await result.then((result) => expect(result).toStrictEqual([{ id: 1, node_id: 2, user_id: 3 }]));
  });

  test('readById', async () => {
    mock.onGet(`${readPath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{ id: 1 }] });
    resultSingle = recentTasksEndpoint.readById(1);
    await resultSingle.then((result) => expect(result).toStrictEqual({ id: 1 }));
  });
});
