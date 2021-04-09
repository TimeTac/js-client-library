import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { ConfigProvider } from '../utils';
import { DepartmentsEndpoint } from './index';
import { Department } from './types';

describe('Departments', () => {
  const departments: DepartmentsEndpoint = new DepartmentsEndpoint(new ConfigProvider({ account: 'testingAccount' }));
  const readPath = `${departments.getResourcePath()}/read`;

  const mock = new AxiosMockAdapter(axios);
  let result: Promise<Department[]> | null;
  let resultSingle: Promise<Department> | null;

  afterEach(() => {
    mock.reset();
    result = null;
    resultSingle = null;
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = departments.read();
    await result.then((result) => {
      expect(result).toStrictEqual([{}]);
    });
  });

  test('read with Success false', async () => {
    mock.onGet(readPath).reply(200, { Success: false });
    result = departments.read();
    await result.catch((result) => {
      expect(result).toStrictEqual({ Success: false });
    });
  });

  test('read with status code 500', async () => {
    mock.onGet(readPath).reply(500);
    expect.assertions(1);
    await departments.read().catch((err: { message: string }) => {
      expect(err.message).toMatch('Request failed with status code 500');
    });
  });

  test('readById', async () => {
    mock.onGet(`${readPath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = departments.readById(1);
    await resultSingle.then((result) => {
      expect(result).toStrictEqual({});
    });
  });
});
