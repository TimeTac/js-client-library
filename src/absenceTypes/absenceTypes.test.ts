import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { ApiResponseOnSuccess } from '../utils/response/apiResponse';
import { AbsenceTypesEndpoint } from './index';
import { AbsenceType } from './types';

describe('AbsenceTypes', () => {
  const absenceTypes: AbsenceTypesEndpoint = new AbsenceTypesEndpoint({ account: 'testingAccount' });
  const readPath: string = `${absenceTypes.getResourcePath()}/read`;

  const mock = new AxiosMockAdapter(axios);
  let result: Promise<AbsenceType[]> | null;
  let resultSingle: Promise<AbsenceType> | null;
  let resultRaw: Promise<ApiResponseOnSuccess<AbsenceType[]>> | null;

  afterEach(() => {
    mock.reset();
    result = null;
    resultSingle = null;
    resultRaw = null;
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = absenceTypes.read();
    await result.then((result) => expect(result).toStrictEqual([{}]));
  });

  test('read with Success false', async () => {
    mock.onGet(readPath).reply(200, { Success: false });
    result = absenceTypes.read();
    await result.catch((result) => expect(result).toStrictEqual({ Success: false }));
  });

  test('read with status code 500', async () => {
    mock.onGet(readPath).reply(500);
    expect.assertions(1);
    await absenceTypes.read().catch((err) => expect(err.message).toMatch('Request failed with status code 500'));
  });

  test('readRaw', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultRaw = absenceTypes.readRaw();
    await resultRaw.then((result) => expect(result).toStrictEqual({ Success: true, NumResults: 1, Results: [{}] }));
  });

  test('readRaw with Success false', async () => {
    mock.onGet(readPath).reply(200, { Success: false });
    expect.assertions(1);
    resultRaw = absenceTypes.readRaw();
    await resultRaw.catch((result) => expect(result).toStrictEqual({ Success: false }));
  });

  test('readRaw with Success false and status code 400', async () => {
    mock.onGet(readPath).reply(400, { Success: false });
    expect.assertions(1);
    await absenceTypes.read().catch((err) => expect(err.message).toMatch('Request failed with status code 400'));
  });

  test('readById', async () => {
    mock.onGet(`${readPath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = absenceTypes.readById(1);
    await resultSingle.then((result) => expect(result).toStrictEqual({}));
  });
});
