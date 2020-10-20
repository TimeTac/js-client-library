import Users from './index';
import { User } from './types';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import RequestParams from '../utils/requestParams';

describe('Users', () => {
  var users: Users = new Users({});
  var readPath: string = `${users.getResourcePath()}/read`;
  var mock = new AxiosMockAdapter(axios);
  var result: Promise<User[]>;

  afterEach(() => {
    mock.reset();
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
});
