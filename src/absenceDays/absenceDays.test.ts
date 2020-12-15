import AbsenceDays from './index';
import { AbsenceDay } from './types';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import RequestParams from '../utils/requestParams/requestParams';

describe('AbsenceDays', () => {
  const absenceDays: AbsenceDays = new AbsenceDays({ account: 'testingAccount' });
  const readPath: string = `${absenceDays.getResourcePath()}/read`;

  const mock = new AxiosMockAdapter(axios);
  let result: Promise<AbsenceDay[]> | null;
  let resultSingle: Promise<AbsenceDay> | null;

  afterEach(() => {
    mock.reset();
    result = null;
    resultSingle = null;
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = absenceDays.read();
    await result.then((result) => expect(result).toStrictEqual([{}]));
  });

  test('read with Success false', async () => {
    mock.onGet(readPath).reply(200, { Success: false });
    result = absenceDays.read();
    await result.catch((result) => expect(result).toStrictEqual({ Success: false }));
  });

  test('read with status code 500', async () => {
    mock.onGet(readPath).reply(500);
    expect.assertions(1);
    await absenceDays.read().catch((err) => expect(err.message).toMatch('Request failed with status code 500'));
  });

  test('read with RequestParams', async () => {
    mock.onGet(readPath, { params: { user_id: '1', _op__user_id: 'eq' } }).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = absenceDays.read(new RequestParams<AbsenceDay>().eq('user_id', 1));
    await result.then((result) => expect(result).toStrictEqual([{}]));

    mock.reset();

    mock
      .onGet(readPath, { params: { user_id: '1', _op__user_id: 'eq', date: '2020-01-01', _op__date: 'gteq' } })
      .reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = absenceDays.read(new RequestParams<AbsenceDay>().eq('user_id', 1).gteq('date', '2020-01-01'));
    await result.then((result) => expect(result).toStrictEqual([{}]));
  });

  test('read with params object', async () => {
    mock.onGet(readPath, { params: { user_id: '1' } }).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = absenceDays.read({ user_id: '1' });
    await result.then((result) => expect(result).toStrictEqual([{}]));

    mock.reset();

    mock
      .onGet(readPath, { params: { user_id: '1', date: '2020-01-01', _op__date: 'gteq' } })
      .reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = absenceDays.read({ user_id: '1', date: '2020-01-01', _op__date: 'gteq' });
    await result.then((result) => expect(result).toStrictEqual([{}]));
  });

  test('readById', async () => {
    mock.onGet(`${readPath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = absenceDays.readById(1);
    await resultSingle.then((result) => expect(result).toStrictEqual({}));
  });
});
