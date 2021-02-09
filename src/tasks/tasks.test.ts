import { afterEach, describe, expect, test } from '@jest/globals';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { RequestParams } from '../utils/params/requestParams';
import { ReadRawResponse } from '../utils/response/readRawResponse';
import { TasksEndpoint } from './index';
import { Task } from './types';

describe('Tasks', () => {
  const tasks: TasksEndpoint = new TasksEndpoint({ account: 'testingAccount' });
  const readPath = `${tasks.getResourcePath()}/read`;

  const mock = new AxiosMockAdapter(axios);
  let result: Promise<Task[]> | null;
  let resultSingle: Promise<Task> | null;
  let resultReadRaw: Promise<ReadRawResponse<Task>> | null;

  afterEach(() => {
    mock.reset();
    result = null;
    resultSingle = null;
    resultReadRaw = null;
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = tasks.read();
    await result.then((result) => expect(result).toStrictEqual([{}]));
  });

  test('read with Success false', async () => {
    mock.onGet(readPath).reply(200, { Success: false });
    result = tasks.read();
    await result.catch((result) => expect(result).toStrictEqual({ Success: false }));
  });

  test('read with status code 500', async () => {
    mock.onGet(readPath).reply(500);
    expect.assertions(1);
    await tasks.read().catch((err) => expect(err.message).toMatch('Request failed with status code 500'));
  });

  test('readById', async () => {
    mock.onGet(`${readPath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = tasks.readById(1);
    await resultSingle.then((result) => expect(result).toStrictEqual({}));
  });
  test('readRaw with no data', async () => {
    const current = new RequestParams<Task>();
    mock.onGet(readPath).reply(200, { Success: true, Results: [{}] });
    resultReadRaw = tasks.readRaw(current);
    await resultReadRaw.then((result) => expect(result).toMatchObject({ data: {}, pages: {} }));
  });

  test('readRaw with next', async () => {
    const current = new RequestParams<Task>().limit(3);
    const next = new RequestParams<Task>().limit(3).offset(3);

    mock.onGet(readPath).reply(200, { Success: true, Results: [{}, {}, {}] });
    resultReadRaw = tasks.readRaw(current);
    await resultReadRaw.then((result) =>
      expect(result).toMatchObject({ data: {}, pages: { prev: undefined, current: current, next: next } })
    );
  });

  test('readRaw with prev', async () => {
    const prev = new RequestParams<Task>().limit(3).offset(0);
    const current = new RequestParams<Task>().limit(3).offset(3);
    const next = new RequestParams<Task>().limit(3).offset(6);

    mock.onGet(readPath).reply(200, { Success: true, Results: [{}, {}, {}] });
    resultReadRaw = tasks.readRaw(current);
    await resultReadRaw.then((result) => expect(result).toMatchObject({ data: {}, pages: { prev, current, next } }));
  });
});
