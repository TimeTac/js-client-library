import Tasks from './index';
import { Task } from './types';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { ApiResponseOnSuccess } from '../utils/response/apiResponse';

describe('Tasks', () => {
  const tasks: Tasks = new Tasks({ account: 'testingAccount' });
  const readPath: string = `${tasks.getResourcePath()}/read`;

  const mock = new AxiosMockAdapter(axios);
  let result: Promise<Task[]> | null;
  let resultSingle: Promise<Task> | null;
  let resultRaw: Promise<ApiResponseOnSuccess<Task[]>> | null;

  afterEach(() => {
    mock.reset();
    result = null;
    resultSingle = null;
    resultRaw = null;
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

  test('readRaw', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultRaw = tasks.readRaw();
    await resultRaw.then((result) => expect(result).toStrictEqual({ Success: true, NumResults: 1, Results: [{}] }));
  });

  test('readById', async () => {
    mock.onGet(`${readPath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = tasks.readById(1);
    await resultSingle.then((result) => expect(result).toStrictEqual({}));
  });
});
