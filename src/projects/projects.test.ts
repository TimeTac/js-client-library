import { afterEach, describe, expect, test } from '@jest/globals';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { RequestParamsBuilder } from '../utils/params/requestParams';
import { ReadRawResponse } from '../utils/response/readRawResponse';
import { ProjectsEndpoint } from './index';
import { Project } from './types';

describe('Projects', () => {
  const projects: ProjectsEndpoint = new ProjectsEndpoint({ account: 'testingAccount' });
  const readPath = `${projects.getResourcePath()}/read`;

  const mock = new AxiosMockAdapter(axios);
  let result: Promise<Project[]> | null;
  let resultSingle: Promise<Project> | null;
  let resultReadRaw: Promise<ReadRawResponse<Project>> | null;

  afterEach(() => {
    mock.reset();
    result = null;
    resultSingle = null;
    resultReadRaw = null;
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = projects.read();
    await result.then((result) => expect(result).toStrictEqual([{}]));
  });

  test('read with Success false', async () => {
    mock.onGet(readPath).reply(200, { Success: false });
    result = projects.read();
    await result.catch((result) => {
      expect(result).toStrictEqual({ Success: false });
    });
  });

  test('read with status code 500', async () => {
    mock.onGet(readPath).reply(500);
    expect.assertions(1);
    await projects.read().catch((err: { message: string }) => {
      expect(err.message).toMatch('Request failed with status code 500');
    });
  });

  test('readRaw with no data', async () => {
    const current = new RequestParamsBuilder<Project>();
    mock.onGet(readPath).reply(200, { Success: true, Results: [{}], _ignoreTypeGuard: true });
    resultReadRaw = projects.readRaw(current.build());
    await resultReadRaw.then((result) => expect(result).toMatchObject({ data: {}, pages: {} }));
  });

  test('readById', async () => {
    mock.onGet(`${readPath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = projects.readById(1);
    await resultSingle.then((result) => expect(result).toStrictEqual({}));
  });
});
