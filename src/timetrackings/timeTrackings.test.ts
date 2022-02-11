import { expect } from '@jest/globals';
import axios from 'axios';

import AxiosMockAdapter from 'axios-mock-adapter';
import { ConfigProvider } from '../utils';
import { RequestParamsBuilder } from '../utils/params/requestParams';
import { ApiResponseOnFailure } from '../utils/response/apiResponse';
import { TimeTracking } from './types';
import { TimeTrackingsEndpoint } from './';

const genericAccessDeniedResponse = {
  Host: 'go-dev.timetac.com',
  Codeversion: '7.17.0',
  Success: false,
  SuccessNested: false,
  ResourceName: 'timeTrackings',
  RequestStartTime: '2021-05-11 11:37:30',
  RequestEndTime: '2021-05-11 11:37:30',
  ServerTimeZone: 'Europe/Vienna',
  Error: 403,
  ErrorMessage: 'Generic access denied for user: 17 | Action:start | Resource: TimeTac\\ORM\\Entity\\TimeTracking',
  ErrorInternal: 'Generic access denied for user: 17 | Action:start | Resource: TimeTac\\ORM\\Entity\\TimeTracking',
};

describe('TimeTrackings', () => {
  const timeTrackings: TimeTrackingsEndpoint = new TimeTrackingsEndpoint(new ConfigProvider({ account: 'testingAccount', host: 'test' }));
  const readPath = `${timeTrackings.getResourcePath()}/read`;
  const createPath = `${timeTrackings.getResourcePath()}/create`;
  const updatePath = `${timeTrackings.getResourcePath()}/update`;
  const deletePath = `${timeTrackings.getResourcePath()}/delete`;
  const startPath = `${timeTrackings.getResourcePath()}/start`;
  const stopPath = `${timeTrackings.getResourcePath()}/stop`;
  const togglePath = `${timeTrackings.getResourcePath()}/toggle`;
  const timezones: { [key: string]: string } = {
    Vienna: 'Europe/Vienna',
    London: 'Europe/London',
  };

  const mock = new AxiosMockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });

    expect.assertions(1);

    await timeTrackings.read().then((result) => {
      expect(result).toStrictEqual({ Affected: {}, Deleted: [], Results: [{}] });
    });
  });

  test('read with RequestParmas', async () => {
    mock.onGet(readPath, { params: { id: '99' } }).reply(200, { Success: true, NumResults: 1, Results: [{}] });

    expect.assertions(1);

    await timeTrackings.read(new RequestParamsBuilder<TimeTracking>().eq('id', 99).build()).then((result) => {
      expect(result).toStrictEqual({ Affected: {}, Deleted: [], Results: [{}] });
    });
  });

  test('read with Success false', async () => {
    mock.onGet(readPath).reply(200, { Success: false });

    expect.assertions(5);

    await timeTrackings
      .read()
      .catch(
        (error: { code: number; message: string; stack: string; _plainError: Record<string, unknown>; response: ApiResponseOnFailure }) => {
          expect(error.code).toBe(200);
          expect(error.message).toBe('Something went wrong');
          expect(error.response).toMatchObject({ Success: false });
          expect(error._plainError).toMatchObject({ status: 200, data: { Success: false } });
          expect(typeof error.stack).toBe('string');
        }
      );
  });

  test('read with thrown error', async () => {
    mock.onGet(readPath).reply(() => {
      throw new Error('The network request failed with this message.');
    });

    expect.assertions(5);

    await timeTrackings
      .read()
      .catch(
        (error: { code: number; message: string; stack: string; _plainError: Record<string, unknown>; response: ApiResponseOnFailure }) => {
          expect(error.message).toBe('The network request failed with this message.');
          expect(error.code).toBeUndefined();
          expect(error.response).toBeUndefined();
          expect(error._plainError).toEqual(new Error('The network request failed with this message.'));
          expect(typeof error.stack).toBe('string');
        }
      );
  });

  test('create with thrown error', async () => {
    mock.onPost(createPath).reply(() => {
      throw new Error('The network request failed with this message.');
    });

    expect.assertions(5);

    await timeTrackings
      .create({ task_id: 5, user_id: 5 })
      .catch(
        (error: { code: number; message: string; stack: string; _plainError: Record<string, unknown>; response: ApiResponseOnFailure }) => {
          expect(error.message).toBe('The network request failed with this message.');
          expect(error.code).toBeUndefined();
          expect(error.response).toBeUndefined();
          expect(error._plainError).toEqual(new Error('The network request failed with this message.'));
          expect(typeof error.stack).toBe('string');
        }
      );
  });

  test('start with thrown error', async () => {
    mock.onPost(startPath).reply(() => {
      throw new Error('The network request failed with this message.');
    });

    expect.assertions(5);

    await timeTrackings
      .start({ task_id: 5, user_id: 5 })
      .catch(
        (error: { code: number; message: string; stack: string; _plainError: Record<string, unknown>; response: ApiResponseOnFailure }) => {
          expect(error.message).toBe('The network request failed with this message.');
          expect(error.code).toBeUndefined();
          expect(error.response).toBeUndefined();
          expect(error._plainError).toEqual(new Error('The network request failed with this message.'));
          expect(typeof error.stack).toBe('string');
        }
      );
  });

  test('read with status code 500', async () => {
    mock.onGet(readPath).reply(500);

    expect.assertions(1);

    await timeTrackings.read().catch((err: { message: string }) => {
      expect(err.message).toMatch('Request failed with status code 500');
    });
  });

  test('create with status code 500', async () => {
    mock.onPost(createPath).reply(500);

    expect.assertions(1);

    await timeTrackings.create({ task_id: 5, user_id: 5 }).catch((err: { message: string }) => {
      expect(err.message).toMatch('Request failed with status code 500');
    });
  });

  test('start with status code 500', async () => {
    mock.onPost(startPath).reply(500);

    expect.assertions(1);

    await timeTrackings.start({ task_id: 5, user_id: 5 }).catch((err: { message: string }) => {
      expect(err.message).toMatch('Request failed with status code 500');
    });
  });

  test('readById', async () => {
    mock.onGet(`${readPath}/1`).reply(200, { Success: true, NumResults: 0, Results: [] });

    expect.assertions(1);

    await timeTrackings.readById(1).then((result) => {
      expect(result).toStrictEqual({
        Results: undefined,
        Affected: {},
        Deleted: [],
      });
    });
  });

  test('create', async () => {
    mock.onPost(createPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });

    expect.assertions(1);

    await timeTrackings.create({ task_id: 1, user_id: 1 }).then((result) => {
      expect(result).toStrictEqual({
        Results: {},
        Affected: {},
        Deleted: [],
      });
    });
  });

  test('create with Success false', async () => {
    mock.onPost(createPath).reply(200, { Success: false, Error: 422, ErrorMessage: 'Unprocessable entity' });

    expect.assertions(5);

    await timeTrackings
      .create({ task_id: 1, user_id: 1 })
      .catch(
        (error: { code: number; message: string; stack: string; _plainError: Record<string, unknown>; response: ApiResponseOnFailure }) => {
          expect(error.code).toBe(422);
          expect(error.message).toBe('Unprocessable entity');
          expect(error.response).toMatchObject({ Success: false, Error: 422, ErrorMessage: 'Unprocessable entity' });
          expect(error._plainError).toMatchObject({
            status: 200,
            data: { Success: false, Error: 422, ErrorMessage: 'Unprocessable entity' },
          });
          expect(typeof error.stack).toBe('string');
        }
      );
  });

  test('create with Success false without ErrorMessage in response', async () => {
    mock.onPost(createPath).reply(200, { Success: false });

    expect.assertions(5);

    await timeTrackings
      .create({ task_id: 1, user_id: 1 })
      .catch(
        (error: { code: number; message: string; stack: string; _plainError: Record<string, unknown>; response: ApiResponseOnFailure }) => {
          expect(error.code).toBe(200);
          expect(error.message).toBe('Something went wrong');
          expect(error.response).toMatchObject({ Success: false });
          expect(error._plainError).toMatchObject({
            status: 200,
            data: { Success: false },
          });
          expect(typeof error.stack).toBe('string');
        }
      );
  });

  test('Start uses ErrorMessage from response', async () => {
    mock.onPost(startPath).reply(403, genericAccessDeniedResponse);

    expect.assertions(5);

    await timeTrackings
      .start({ task_id: 1, user_id: 1 })
      .catch(
        (error: { code: number; message: string; stack: string; _plainError: Record<string, unknown>; response: ApiResponseOnFailure }) => {
          expect(error.code).toBe(403);
          expect(error.message).toBe('Generic access denied for user: 17 | Action:start | Resource: TimeTac\\ORM\\Entity\\TimeTracking');
          expect(error.response).toMatchObject(genericAccessDeniedResponse);
          expect(error._plainError).toMatchObject({
            status: 403,
            data: genericAccessDeniedResponse,
          });
          expect(typeof error.stack).toBe('string');
        }
      );
  });

  test('Create uses ErrorMessage from response', async () => {
    mock.onPost(createPath).reply(403, genericAccessDeniedResponse);

    expect.assertions(5);

    await timeTrackings
      .create({ task_id: 1, user_id: 1 })
      .catch(
        (error: { code: number; message: string; stack: string; _plainError: Record<string, unknown>; response: ApiResponseOnFailure }) => {
          expect(error.code).toBe(403);
          expect(error.message).toBe('Generic access denied for user: 17 | Action:start | Resource: TimeTac\\ORM\\Entity\\TimeTracking');
          expect(error.response).toMatchObject(genericAccessDeniedResponse);
          expect(error._plainError).toMatchObject({
            status: 403,
            data: genericAccessDeniedResponse,
          });
          expect(typeof error.stack).toBe('string');
        }
      );
  });

  test('update', async () => {
    mock.onPut(updatePath).reply(200, { Success: true, NumResults: 1, Results: [{}] });

    expect.assertions(1);

    await timeTrackings.update({ id: 1, task_id: 1 }).then((result) => {
      expect(result).toStrictEqual({
        Results: {},
        Affected: {},
        Deleted: [],
      });
    });
  });

  test('delete', async () => {
    mock.onDelete(`${deletePath}/1`).reply(200, { Success: true, NumResults: 1, Results: [] });

    expect.assertions(1);

    await timeTrackings.delete(1).then((result) => {
      expect(result).toStrictEqual({
        Results: undefined,
        Affected: {},
        Deleted: [],
      });
    });
  });

  test('start', async () => {
    mock.onPost(startPath).reply(200, { Success: true, NumResults: 1, Results: [{}], Affected: {}, _ignoreTypeGuard: true });

    expect.assertions(1);

    const result = await timeTrackings.start({ task_id: 1, user_id: 1 });

    expect(result).toStrictEqual({
      Results: {},
      Affected: {},
      Deleted: [],
    });
  });

  test('start with Success false without ErrorMessage in response', async () => {
    mock.onPost(startPath).reply(200, { Success: false });

    expect.assertions(5);

    await timeTrackings
      .start({ task_id: 1, user_id: 1 })
      .catch(
        (error: { code: number; message: string; stack: string; _plainError: Record<string, unknown>; response: ApiResponseOnFailure }) => {
          expect(error.code).toBe(200);
          expect(error.message).toBe('Something went wrong');
          expect(error.response).toMatchObject({ Success: false });
          expect(error._plainError).toMatchObject({
            status: 200,
            data: { Success: false },
          });
          expect(typeof error.stack).toBe('string');
        }
      );
  });

  test('start with Success false', async () => {
    mock.onPost(startPath).reply(200, { Success: false, Error: 422, ErrorMessage: 'Unprocessable entity' });

    expect.assertions(5);

    await timeTrackings
      .start({ task_id: 1, user_id: 1 })
      .catch(
        (error: { code: number; message: string; stack: string; _plainError: Record<string, unknown>; response: ApiResponseOnFailure }) => {
          expect(error.code).toBe(422);
          expect(error.message).toBe('Unprocessable entity');
          expect(error.response).toMatchObject({ Success: false, Error: 422, ErrorMessage: 'Unprocessable entity' });
          expect(error._plainError).toMatchObject({
            status: 200,
            data: { Success: false, Error: 422, ErrorMessage: 'Unprocessable entity' },
          });
          expect(typeof error.stack).toBe('string');
        }
      );
  });

  test('stop', async () => {
    mock.onPut(stopPath).reply(200, { Success: true, NumResults: 0, Results: [] });

    expect.assertions(1);

    await timeTrackings.stop({ user_id: 1, end_time_timezone: 'foo' }).then((result) => {
      expect(result).toStrictEqual({
        Results: undefined,
        Affected: {},
        Deleted: [],
      });
    });
  });

  test('start with toggle', async () => {
    mock.onPost(togglePath).reply(200, {
      Success: true,
      NumResults: 1,
      Results: [{ start_time_timezone: timezones['Vienna'] }],
      Affected: {},
      _ignoreTypeGuard: true,
    });

    expect.assertions(1);

    const result = await timeTrackings.toggle({ timezone: timezones['Vienna'], user_id: 1 });

    expect(result).toEqual({
      Results: { start_time_timezone: timezones['Vienna'] },
      Affected: {},
      Deleted: [],
    });
  });

  test('stop with toggle', async () => {
    mock.onPost(togglePath).reply(200, {
      Success: true,
      NumResults: 1,
      Results: [{ end_time_timezone: timezones['Vienna'] }],
      Affected: {},
      _ignoreTypeGuard: true,
    });

    expect.assertions(1);

    const result = await timeTrackings.toggle({ timezone: timezones['Vienna'], user_id: 1 });
    expect(result).toEqual({
      Results: { end_time_timezone: timezones['Vienna'] },
      Affected: {},
      Deleted: [],
    });
  });
});
