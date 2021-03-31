import { describe, expect, test } from '@jest/globals';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { createMock } from 'ts-auto-mock';

import { ErrorReason, TimeTacApiError } from '../errors';
import { RequestParamsBuilder } from '../utils/params/requestParams';
import { ReadRawResponse } from '../utils/response/readRawResponse';
import { ChangeTimeTrackingRequestEndpoint } from './index';
import { ChangeTimeTrackingRequest } from './types';

type Resource = ChangeTimeTrackingRequest;
const endpoint: ChangeTimeTrackingRequestEndpoint = new ChangeTimeTrackingRequestEndpoint({ account: 'testingAccount' });

describe('changeTimeTrackingRequest.read', () => {
  const readPath = `${endpoint.getResourcePath()}/read`;

  test('with status 200 and Success true and single result', async () => {
    const mock = new AxiosMockAdapter(axios);
    const record = createMock<Resource>();

    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [record] });
    const actual: Promise<Resource[]> = endpoint.read();
    expect(await actual).toStrictEqual([record]);
  });

  test('with status 200 and Success true and more results', async () => {
    const mock = new AxiosMockAdapter(axios);
    const record = createMock<Resource>();

    mock.onGet(readPath).reply(200, { Success: true, NumResults: 5, Results: [record, record, record, record, record] });
    const actual: Promise<Resource[]> = endpoint.read();
    expect(await actual).toStrictEqual([record, record, record, record, record]);
  });

  test('with status 200 and Success true and params', async () => {
    const mock = new AxiosMockAdapter(axios);
    const record = createMock<Resource>();
    const body = { params: { id: '42', _op__id: 'eq' } };
    const requestParams = new RequestParamsBuilder<Resource>().eq('id', 42).build();

    mock.onGet(readPath, body).reply(200, { Success: true, NumResults: 5, Results: [record] });
    const actual: Promise<Resource[]> = endpoint.read(requestParams);
    expect(await actual).toStrictEqual([record]);
  });

  test('with status 200 and Success false', async () => {
    const mock = new AxiosMockAdapter(axios);
    const record = createMock<Resource>();
    const apiResponse = { Success: false, NumResults: 1, Results: [record] };

    mock.onGet(readPath).reply(200, apiResponse);
    const actual: Promise<Resource[]> = endpoint.read();
    expect(await actual.catch((err: typeof apiResponse) => err)).toStrictEqual(apiResponse);
  });

  test('with status 400 and Success false', async () => {
    const mock = new AxiosMockAdapter(axios);
    const record = createMock<Resource>();
    const apiResponse = { Success: false, NumResults: 1, Results: [record] };

    mock.onGet(readPath).reply(400, apiResponse);
    const actual: Promise<Resource[]> = endpoint.read();
    expect(await actual.catch((err: { message: string }) => err.message)).toMatch('Request failed with status code 400');
  });
});

describe('changeTimeTrackingRequestRead.readRaw', () => {
  const readPath = `${endpoint.getResourcePath()}/read`;

  test('with status 200 and Success true and single result', async () => {
    const mock = new AxiosMockAdapter(axios);
    const record = createMock<Resource>();
    const requestParams = new RequestParamsBuilder<Resource>().build();

    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [record], _ignoreTypeGuard: true });
    const actual: Promise<ReadRawResponse<Resource>> = endpoint.readRaw(requestParams);
    const expected = {
      data: { success: true, results: [record], deleted: [], affected: {} },
      pages: { current: {} },
    };
    expect(await actual).toMatchObject(expected);
  });

  test('with status 200 and Success true and more results', async () => {
    const mock = new AxiosMockAdapter(axios);
    const record = createMock<Resource>();
    const requestParams = new RequestParamsBuilder<Resource>().build();

    mock
      .onGet(readPath)
      .reply(200, { Success: true, NumResults: 5, Results: [record, record, record, record, record], _ignoreTypeGuard: true });
    const actual: Promise<ReadRawResponse<Resource>> = endpoint.readRaw(requestParams);
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
    const requestParams = new RequestParamsBuilder<Resource>().eq('id', 42).build();

    mock.onGet(readPath, body).reply(200, { Success: true, NumResults: 5, Results: [record], _ignoreTypeGuard: true });
    const actual: Promise<ReadRawResponse<Resource>> = endpoint.readRaw(requestParams);
    const expected = {
      data: { success: true, results: [record], deleted: [], affected: {} },
      pages: { current: { id: '42', _op__id: 'eq' } },
    };
    expect(await actual).toMatchObject(expected);
  });

  test('with status 200 and Success false', async () => {
    const mock = new AxiosMockAdapter(axios);
    const record = createMock<Resource>();
    const requestParams = new RequestParamsBuilder<Resource>().build();
    const apiResponse = { Success: false, NumResults: 1, Results: [record], _ignoreTypeGuard: true };

    mock.onGet(readPath).reply(200, apiResponse);
    const actual: Promise<ReadRawResponse<Resource>> = endpoint.readRaw(requestParams);
    expect(await actual.catch((err: TimeTacApiError) => err)).toMatchObject({ reason: ErrorReason.ResponseFailed });
  });

  test('with status 400 and Success false', async () => {
    const mock = new AxiosMockAdapter(axios);
    const record = createMock<Resource>();
    const requestParams = new RequestParamsBuilder<Resource>().build();
    const apiResponse = { Success: false, NumResults: 1, Results: [record], _ignoreTypeGuard: true };

    mock.onGet(readPath).reply(400, apiResponse);
    const actual: Promise<ReadRawResponse<Resource>> = endpoint.readRaw(requestParams);
    expect(await actual.catch((err: TimeTacApiError) => err)).toMatchObject({ reason: ErrorReason.ResponseFailed });
  });

  test('with status 200 and Success true and pages.next', async () => {
    const mock = new AxiosMockAdapter(axios);
    const record = createMock<Resource>();
    const current = new RequestParamsBuilder<Resource>().limit(3).build();
    const next = new RequestParamsBuilder<Resource>().limit(3).offset(3).build();

    mock.onGet(readPath).reply(200, { Success: true, NumResults: 3, Results: [record, record, record], _ignoreTypeGuard: true });
    const actual: Promise<ReadRawResponse<Resource>> = endpoint.readRaw(current);
    const expected = {
      data: { success: true, results: [record, record, record], deleted: [], affected: {} },
      pages: { current, next },
    };
    expect(await actual).toMatchObject(expected);
  });

  test('with status 200 and Success true and pages.next and pages.prev', async () => {
    const mock = new AxiosMockAdapter(axios);
    const record = createMock<Resource>();
    const prev = new RequestParamsBuilder<Resource>().limit(3).offset(0).build();
    const current = new RequestParamsBuilder<Resource>().limit(3).offset(3).build();
    const next = new RequestParamsBuilder<Resource>().limit(3).offset(6).build();

    mock.onGet(readPath).reply(200, { Success: true, NumResults: 3, Results: [record, record, record], _ignoreTypeGuard: true });
    const actual: Promise<ReadRawResponse<Resource>> = endpoint.readRaw(current);
    const expected = {
      data: { success: true, results: [record, record, record], deleted: [], affected: {} },
      pages: { prev, current, next },
    };
    expect(await actual).toMatchObject(expected);
  });
});
