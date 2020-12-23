import { ProjectsEndpoint } from './index';
import { Project } from './types';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { ApiResponseOnSuccess } from '../utils/response/apiResponse';

describe('Projects', () => {
  const projects: ProjectsEndpoint = new ProjectsEndpoint({ account: 'testingAccount' });
  const readPath: string = `${projects.getResourcePath()}/read`;

  const mock = new AxiosMockAdapter(axios);
  let result: Promise<Project[]> | null;
  let resultSingle: Promise<Project> | null;
  let resultRaw: Promise<ApiResponseOnSuccess<Project[]>> | null;

  afterEach(() => {
    mock.reset();
    result = null;
    resultSingle = null;
    resultRaw = null;
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = projects.read();
    await result.then((result) => expect(result).toStrictEqual([{}]));
  });

  test('read with Success false', async () => {
    mock.onGet(readPath).reply(200, { Success: false });
    result = projects.read();
    await result.catch((result) => expect(result).toStrictEqual({ Success: false }));
  });

  test('read with status code 500', async () => {
    mock.onGet(readPath).reply(500);
    expect.assertions(1);
    await projects.read().catch((err) => expect(err.message).toMatch('Request failed with status code 500'));
  });

  test('readRaw', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultRaw = projects.readRaw();
    await resultRaw.then((result) => expect(result).toStrictEqual({ Success: true, NumResults: 1, Results: [{}] }));
  });

  test('readById', async () => {
    mock.onGet(`${readPath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = projects.readById(1);
    await resultSingle.then((result) => expect(result).toStrictEqual({}));
  });
});
