import AbsenceDays from './index';
import { AbsenceDay } from './types';
import { Absence } from '../absences/types';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import RequestParams from '../utils/requestParams';

var absenceDays: AbsenceDays;
var mock = new AxiosMockAdapter(axios);

describe('AbsenceDays', () => {
  beforeAll(() => {
    absenceDays = new AbsenceDays({});
  });

  test('read', async () => {
    let result: Promise<AbsenceDay[]>;
    let path = `${absenceDays.getResourcePath()}/read`;

    mock.onGet(path).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = absenceDays.read(new RequestParams<AbsenceDay>());
    await result;

    mock.onGet(path, { params: { user_id: '1', _op__user_id: 'eq' } }).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = absenceDays.read(new RequestParams<AbsenceDay>().eq('user_id', '1'));
    await result;

    mock.onGet(path).reply(500, { Success: false });
    result = absenceDays.read(new RequestParams<AbsenceDay>());
    await result;
  });
});
