import { afterEach, describe, expect, test } from '@jest/globals';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { RequestParamsBuilder } from '../utils/params/requestParams';
import { ApiResponseWithPages } from '../utils/response/apiResponseWithPages';
import { UsersEndpoint } from './index';
import { User } from './types';

describe('Users', () => {
  const users: UsersEndpoint = new UsersEndpoint({ account: 'testingAccount' });
  const readPath = `${users.getResourcePath()}/read`;
  const mock = new AxiosMockAdapter(axios);

  let result: Promise<User[]> | null;
  let resultSingle: Promise<User> | null;
  let resultReadRaw: Promise<ApiResponseWithPages<User>> | null;

  afterEach(() => {
    mock.reset();
    result = null;
    resultSingle = null;
    resultReadRaw = null;
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = users.read();
    await result.then((result) => expect(result).toStrictEqual([{}]));
  });

  test('read with Success false', async () => {
    mock.onGet(readPath).reply(200, { Success: false });
    result = users.read();
    await result.catch((result) => expect(result).toStrictEqual({ Success: false }));
  });

  test('read with status code 500', async () => {
    mock.onGet(readPath).reply(500);
    expect.assertions(1);
    await users.read().catch((err) => expect(err.message).toMatch('Request failed with status code 500'));
  });

  test('readRaw with no data', async () => {
    const current = new RequestParamsBuilder<User>();
    mock.onGet(readPath).reply(200, { Success: true, Results: [{}] });
    resultReadRaw = users.readRaw(current.build());
    await resultReadRaw.then((result) => expect(result).toMatchObject({ data: {}, pages: {} }));
  });

  test('readById', async () => {
    mock.onGet(`${readPath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = users.readById(1);
    await resultSingle.then((result) => expect(result).toStrictEqual({}));
  });
});
