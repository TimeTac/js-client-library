import { UsersEndpoint } from './index';
import { User } from './types';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { ApiResponseOnSuccess } from '../utils/response/apiResponse';

describe('Users', () => {
  const users: UsersEndpoint = new UsersEndpoint({ account: 'testingAccount' });
  const readPath: string = `${users.getResourcePath()}/read`;
  const mock = new AxiosMockAdapter(axios);

  let result: Promise<User[]> | null;
  let resultSingle: Promise<User> | null;
  let resultRaw: Promise<ApiResponseOnSuccess<User[]>> | null;

  afterEach(() => {
    mock.reset();
    result = null;
    resultSingle = null;
    resultRaw = null;
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

  test('readRaw', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultRaw = users.readRaw();
    await resultRaw.then((result) => expect(result).toStrictEqual({ Success: true, NumResults: 1, Results: [{}] }));
  });

  test('readById', async () => {
    mock.onGet(`${readPath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = users.readById(1);
    await resultSingle.then((result) => expect(result).toStrictEqual({}));
  });
});
