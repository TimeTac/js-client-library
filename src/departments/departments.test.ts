import Departments from './index';
import { Department } from './types';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import RequestParams from '../utils/requestParams';

describe('Departments', () => {
  var departments: Departments = new Departments({});
  var readPath: string = `${departments.getResourcePath()}/read`;
  var mock = new AxiosMockAdapter(axios);
  var result: Promise<Department[]> | null;
  var resultSingle: Promise<Department> | null;

  afterEach(() => {
    mock.reset();
    result = null;
    resultSingle = null;
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = departments.read();
    await result.then((result) => expect(result).toStrictEqual([{}]));
  });

  test('read with Success false', async () => {
    mock.onGet(readPath).reply(200, { Success: false });
    result = departments.read();
    await result.catch((result) => expect(result).toStrictEqual({ Success: false }));
  });

  test('read with status code 500', async () => {
    mock.onGet(readPath).reply(500);
    result = departments.read();
    await result.then((result) => expect(result).toBe('Request failed with status code 500'));
  });

  test('readById', async () => {
    mock.onGet(`${readPath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = departments.readById(1);
    await resultSingle.then((result) => expect(result).toStrictEqual({}));
  });
});
