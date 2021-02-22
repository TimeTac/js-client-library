import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { RequestParamsBuilder } from '../utils/params/requestParams';
import { ReadRawResponse } from '../utils/response/readRawResponse';
import { AbsenceTypesEndpoint } from './index';
import { AbsenceType } from './types';

describe('AbsenceTypes', () => {
  const absenceTypes: AbsenceTypesEndpoint = new AbsenceTypesEndpoint({ account: 'testingAccount' });
  const readPath: string = `${absenceTypes.getResourcePath()}/read`;

  const mock = new AxiosMockAdapter(axios);
  let result: Promise<AbsenceType[]> | null;
  let resultSingle: Promise<AbsenceType> | null;
  let resultReadRaw: Promise<ReadRawResponse<AbsenceType>> | null;

  afterEach(() => {
    mock.reset();
    result = null;
    resultSingle = null;
    resultReadRaw = null;
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

  test('readRaw with no data', async () => {
    const current = new RequestParamsBuilder<AbsenceType>();
    mock.onGet(readPath).reply(200, { Success: true, Results: [{}], _ignoreTypeGuard: true });
    resultReadRaw = absenceTypes.readRaw(current.build());
    await resultReadRaw.then((result) => expect(result).toMatchObject({ data: {}, pages: {} }));
  });

  test('readById', async () => {
    mock.onGet(`${readPath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = absenceTypes.readById(1);
    await resultSingle.then((result) => expect(result).toStrictEqual({}));
  });
});
