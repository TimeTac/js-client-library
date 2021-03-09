import { afterEach, describe, expect, test } from '@jest/globals';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { RequestConfigBuilder } from '../utils/configs/requestConfigBuilder';
import { TimeTacApiError, TimeTacErrorType } from '../utils/errors';
import { GetResponse } from '../utils/response/getResponse';
import { PutResponse } from '../utils/response/putResponse';
import { UsersEndpoint } from './index';
import { User } from './types';

describe('Users', () => {
  const users: UsersEndpoint = new UsersEndpoint({ account: 'testingAccount' });
  const readPath = `${users.getResourcePath()}/read`;
  const updatePath = `${users.getResourcePath()}/update`;
  const mock = new AxiosMockAdapter(axios);

  let result: Promise<User[]> | null;
  let resultSingle: Promise<User> | null;
  let resultReadRaw: Promise<GetResponse<User>> | null;
  let resultUpdateRaw: Promise<PutResponse<User>> | null;

  afterEach(() => {
    mock.reset();
    result = null;
    resultSingle = null;
    resultReadRaw = null;
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}], _ignoreTypeGuard: true });
    result = users.read(new RequestConfigBuilder<User>().build());
    await result.then((result) => expect(result).toStrictEqual([{}]));
  });

  test('read with Success false', async () => {
    mock.onGet(readPath).reply(200, { Success: false, _ignoreTypeGuard: true });
    result = users.read(new RequestConfigBuilder<User>().build());
    expect(await result.catch((err: TimeTacApiError) => err)).toMatchObject({ errorType: TimeTacErrorType.FailedRequest });
  });

  test('read with status code 500', async () => {
    mock.onGet(readPath).reply(500);
    result = users.read(new RequestConfigBuilder<User>().build());
    expect(await result.catch((err: TimeTacApiError) => err)).toMatchObject({ errorType: TimeTacErrorType.FailedRequest });
  });

  test('readRaw with no data', async () => {
    const current = new RequestConfigBuilder<User>();
    mock.onGet(readPath).reply(200, { Success: true, Results: [{}], _ignoreTypeGuard: true });
    resultReadRaw = users.readRaw(current.build());
    await resultReadRaw.then((result) => expect(result).toMatchObject({ data: {}, pages: {} }));
  });

  test('readById', async () => {
    mock.onGet(`${readPath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{}], _ignoreTypeGuard: true });
    resultSingle = users.readById(1, new RequestConfigBuilder<User>().build());
    await resultSingle.then((result) => expect(result).toStrictEqual({}));
  });

  test('update', async () => {
    mock.onPut(updatePath).reply(200, { Success: true, Results: [{}], _ignoreTypeGuard: true });
    resultUpdateRaw = users.update({ id: 1 }, new RequestConfigBuilder<User>().build());
    expect(await resultUpdateRaw).toMatchObject({ data: {} });
  });
});
