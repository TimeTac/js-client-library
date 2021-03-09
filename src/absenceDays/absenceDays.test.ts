import { describe, expect, test } from '@jest/globals';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { createMock } from 'ts-auto-mock';

import { RequestConfigBuilder } from '../utils/configs/requestConfigBuilder';
import { TimeTacApiError, TimeTacErrorType } from '../utils/errors';
import { GetResponse } from '../utils/response/getResponse';
import { AbsenceDaysEndpoint } from './index';
import { AbsenceDay } from './types';

type Resource = AbsenceDay;
const endpoint: AbsenceDaysEndpoint = new AbsenceDaysEndpoint({ account: 'testingAccount' });

describe('tasks.read', () => {
  const readPath = `${endpoint.getResourcePath()}/read`;

  test('with status 200 and Success true and single result', async () => {
    const mock = new AxiosMockAdapter(axios);
    const record = createMock<Resource>();

    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [record], _ignoreTypeGuard: true });
    const actual: Promise<Resource[]> = endpoint.read(new RequestConfigBuilder<Resource>().build());
    expect(await actual).toStrictEqual([record]);
  });

  test('with status 200 and Success true and more results', async () => {
    const mock = new AxiosMockAdapter(axios);
    const record = createMock<Resource>();

    mock
      .onGet(readPath)
      .reply(200, { Success: true, NumResults: 5, Results: [record, record, record, record, record], _ignoreTypeGuard: true });
    const actual: Promise<Resource[]> = endpoint.read(new RequestConfigBuilder<Resource>().build());
    expect(await actual).toStrictEqual([record, record, record, record, record]);
  });

  test('with status 200 and Success true and params', async () => {
    const mock = new AxiosMockAdapter(axios);
    const record = createMock<Resource>();
    const body = { params: { id: '42', _op__id: 'eq' } };
    const requestParams = new RequestConfigBuilder<Resource>().eq('id', 42).build();

    mock.onGet(readPath, body).reply(200, { Success: true, NumResults: 5, Results: [record], _ignoreTypeGuard: true });
    const actual: Promise<Resource[]> = endpoint.read(requestParams);
    expect(await actual).toStrictEqual([record]);
  });

  test('with status 200 and Success false', async () => {
    const mock = new AxiosMockAdapter(axios);
    const record = createMock<Resource>();
    const apiResponse = { Success: false, NumResults: 1, Results: [record], _ignoreTypeGuard: true };

    mock.onGet(readPath).reply(200, apiResponse);
    const actual: Promise<Resource[]> = endpoint.read(new RequestConfigBuilder<Resource>().build());
    expect(await actual.catch((err: TimeTacApiError) => err)).toMatchObject({ errorType: TimeTacErrorType.FailedRequest });
  });

  test('with status 400 and Success false', async () => {
    const mock = new AxiosMockAdapter(axios);
    const record = createMock<Resource>();
    const apiResponse = { Success: false, NumResults: 1, Results: [record], _ignoreTypeGuard: true };

    mock.onGet(readPath).reply(400, apiResponse);
    const actual: Promise<Resource[]> = endpoint.read(new RequestConfigBuilder<Resource>().build());
    expect(await actual.catch((err: TimeTacApiError) => err)).toMatchObject({ errorType: TimeTacErrorType.FailedRequest });
  });
});

describe('tasks.readRaw', () => {
  const readPath = `${endpoint.getResourcePath()}/read`;

  test('with status 200 and Success true and single result', async () => {
    const mock = new AxiosMockAdapter(axios);
    const record = createMock<Resource>();
    const requestParams = new RequestConfigBuilder<Resource>().build();

    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [record], _ignoreTypeGuard: true });
    const actual: Promise<GetResponse<Resource>> = endpoint.readRaw(requestParams);
    const expected = {
      data: { success: true, results: [record], deleted: [], affected: {} },
      pages: { current: {} },
    };
    expect(await actual).toMatchObject(expected);
  });

  test('with status 200 and Success true and more results', async () => {
    const mock = new AxiosMockAdapter(axios);
    const record = createMock<Resource>();
    const requestParams = new RequestConfigBuilder<Resource>().build();

    mock
      .onGet(readPath)
      .reply(200, { Success: true, NumResults: 5, Results: [record, record, record, record, record], _ignoreTypeGuard: true });
    const actual: Promise<GetResponse<Resource>> = endpoint.readRaw(requestParams);
    const expected = {
      data: { success: true, results: [record, record, record, record, record], deleted: [], affected: {} },
      pages: { current: {} },
    };
    expect(await actual).toMatchObject(expected);
  });

  test('with status 200 and Success true and params', async () => {
    const mock = new AxiosMockAdapter(axios);
    const record = createMock<Resource>();
    const body = { params: { id: '42', _op__id: 'eq' } };
    const requestParams = new RequestConfigBuilder<Resource>().eq('id', 42).build();

    mock.onGet(readPath, body).reply(200, { Success: true, NumResults: 5, Results: [record], _ignoreTypeGuard: true });
    const actual: Promise<GetResponse<Resource>> = endpoint.readRaw(requestParams);
    const expected = {
      data: { success: true, results: [record], deleted: [], affected: {} },
      pages: { current: { params: { id: '42', _op__id: 'eq' } } },
    };
    expect(await actual).toMatchObject(expected);
  });

  test('with status 200 and Success false', async () => {
    const mock = new AxiosMockAdapter(axios);
    const record = createMock<Resource>();
    const requestParams = new RequestConfigBuilder<Resource>().build();
    const apiResponse = { Success: false, NumResults: 1, Results: [record], _ignoreTypeGuard: true };

    mock.onGet(readPath).reply(200, apiResponse);
    const actual: Promise<GetResponse<Resource>> = endpoint.readRaw(requestParams);
    expect(await actual.catch((err: TimeTacApiError) => err)).toMatchObject({ errorType: TimeTacErrorType.FailedRequest });
  });

  test('with status 400 and Success false', async () => {
    const mock = new AxiosMockAdapter(axios);
    const record = createMock<Resource>();
    const requestParams = new RequestConfigBuilder<Resource>().build();
    const apiResponse = { Success: false, NumResults: 1, Results: [record], _ignoreTypeGuard: true };

    mock.onGet(readPath).reply(400, apiResponse);
    const actual: Promise<GetResponse<Resource>> = endpoint.readRaw(requestParams);
    expect(await actual.catch((err: TimeTacApiError) => err)).toMatchObject({ errorType: TimeTacErrorType.FailedRequest });
  });

  test('with status 200 and Success true and pages.next', async () => {
    const mock = new AxiosMockAdapter(axios);
    const record = createMock<Resource>();
    const current = new RequestConfigBuilder<Resource>().limit(3).build();
    const next = new RequestConfigBuilder<Resource>().limit(3).offset(3).build();

    mock.onGet(readPath).reply(200, { Success: true, NumResults: 3, Results: [record, record, record], _ignoreTypeGuard: true });
    const actual: Promise<GetResponse<Resource>> = endpoint.readRaw(current);
    const expected = {
      data: { success: true, results: [record, record, record], deleted: [], affected: {} },
      pages: { current, next },
    };
    expect(await actual).toMatchObject(expected);
  });

  test('with status 200 and Success true and pages.next and pages.prev', async () => {
    const mock = new AxiosMockAdapter(axios);
    const record = createMock<Resource>();
    const prev = new RequestConfigBuilder<Resource>().limit(3).offset(0).build();
    const current = new RequestConfigBuilder<Resource>().limit(3).offset(3).build();
    const next = new RequestConfigBuilder<Resource>().limit(3).offset(6).build();

    mock.onGet(readPath).reply(200, { Success: true, NumResults: 3, Results: [record, record, record], _ignoreTypeGuard: true });
    const actual: Promise<GetResponse<Resource>> = endpoint.readRaw(current);
    const expected = {
      data: { success: true, results: [record, record, record], deleted: [], affected: {} },
      pages: { prev, current, next },
    };
    expect(await actual).toMatchObject(expected);
  });
});
