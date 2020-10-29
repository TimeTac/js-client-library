import Users from './index';
import { User } from './types';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import RequestParams from '../utils/requestParams';

describe('Users', () => {
  var users: Users = new Users({});
  var readPath: string = `${users.getResourcePath()}/read`;
  var mock = new AxiosMockAdapter(axios);
  var result: Promise<User[]> | null;
  var resultSingle: Promise<User> | null;

  afterEach(() => {
    mock.reset();
    result = null;
    resultSingle = null;
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
    result = users.read();
    await result.then((result) => expect(result).toBe('Request failed with status code 500'));
  });

  test('readById', async () => {
    mock.onGet(`${readPath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = users.readById(1);
    await resultSingle.then((result) => expect(result).toStrictEqual({}));
  });
});
