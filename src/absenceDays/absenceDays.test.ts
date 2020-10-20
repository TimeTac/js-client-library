import AbsenceDays from './index';
import { AbsenceDay } from './types';
import { Absence } from '../absences/types';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import RequestParams from '../utils/requestParams';

describe('AbsenceDays', () => {
  var absenceDays: AbsenceDays;
  var mock = new AxiosMockAdapter(axios);
  var result: Promise<AbsenceDay[]>;
  var path: string;

  beforeAll(() => {
    absenceDays = new AbsenceDays({});
    path = `${absenceDays.getResourcePath()}/read`;
  });

  afterEach(() => {
    mock.reset();
  });

  test('read', async () => {
    mock.onGet(path).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = absenceDays.read();
    await result.then((result) => expect(result).toStrictEqual([{}]));
  });

  test('read with Success false', async () => {
    mock.onGet(path).reply(200, { Success: false });
    result = absenceDays.read();
    await result.catch((result) => expect(result).toStrictEqual({ Success: false }));
  });

  test('read with status code 500', async () => {
    mock.onGet(path).reply(500);
    result = absenceDays.read();
    await result.then((result) => expect(result).toBe('Request failed with status code 500'));
  });

  test('read with RequestParams', async () => {
    mock.onGet(path, { params: { user_id: '1', _op__user_id: 'eq' } }).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = absenceDays.read(new RequestParams<AbsenceDay>().eq('user_id', '1'));
    await result.then((result) => expect(result).toStrictEqual([{}]));

    mock.reset();

    mock
      .onGet(path, { params: { user_id: '1', _op__user_id: 'eq', date: '2020-01-01', _op__date: 'gteq' } })
      .reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = absenceDays.read(new RequestParams<AbsenceDay>().eq('user_id', '1').gteq('date', '2020-01-01'));
    await result.then((result) => expect(result).toStrictEqual([{}]));
  });

  test('read with params object', async () => {
    mock.onGet(path, { params: { user_id: '1' } }).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = absenceDays.read({ user_id: '1' });
    await result.then((result) => expect(result).toStrictEqual([{}]));

    mock.reset();

    mock
      .onGet(path, { params: { user_id: '1', date: '2020-01-01', _op__date: 'gteq' } })
      .reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = absenceDays.read({ user_id: '1', date: '2020-01-01', _op__date: 'gteq' });
    await result.then((result) => expect(result).toStrictEqual([{}]));
  });
});
