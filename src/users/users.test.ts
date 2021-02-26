import { afterEach, describe, expect, test } from '@jest/globals';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { RequestParamsBuilder } from '../utils/params/requestParams';
import { ReadRawResponse } from '../utils/response/readRawResponse';
import { UpdateRawResponse } from '../utils/response/updateRawResponse';
import { UsersEndpoint } from './index';
import { User } from './types';

describe('Users', () => {
  const users: UsersEndpoint = new UsersEndpoint({ account: 'testingAccount' });
  const readPath = `${users.getResourcePath()}/read`;
  const updatePath = `${users.getResourcePath()}/update`;
  const mock = new AxiosMockAdapter(axios);

  let result: Promise<User[]> | null;
  let resultSingle: Promise<User> | null;
  let resultReadRaw: Promise<ReadRawResponse<User>> | null;
  let resultUpdateRaw: Promise<UpdateRawResponse<User>> | null;

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
    await result.catch((result) => {
      expect(result).toStrictEqual({ Success: false });
    });
  });

  test('read with status code 500', async () => {
    mock.onGet(readPath).reply(500);
    expect.assertions(1);
    await users.read().catch((err) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(err.message).toMatch('Request failed with status code 500');
    });
  });

  test('readRaw with no data', async () => {
    const current = new RequestParamsBuilder<User>();
    mock.onGet(readPath).reply(200, { Success: true, Results: [{}], _ignoreTypeGuard: true });
    resultReadRaw = users.readRaw(current.build());
    await resultReadRaw.then((result) => expect(result).toMatchObject({ data: {}, pages: {} }));
  });

  test('readById', async () => {
    mock.onGet(`${readPath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = users.readById(1);
    await resultSingle.then((result) => expect(result).toStrictEqual({}));
  });

  test('update', async () => {
    mock.onPut(updatePath).reply(200, { Success: true, Results: [{}], _ignoreTypeGuard: true });
    resultUpdateRaw = users.update({ id: 1 });
    expect(await resultUpdateRaw).toMatchObject({ data: {} });
  });
});
