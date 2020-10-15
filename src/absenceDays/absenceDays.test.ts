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

    mock.onGet('https://go.timetac.com/undefined/userapi/v3/absencesDays/read').reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = absenceDays.read(new RequestParams<AbsenceDay>());

    mock
      .onGet('https://go.timetac.com/undefined/userapi/v3/absencesDays/read', { params: { user_id: '1', _op__user_id: 'eq' } })
      .reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = absenceDays.read(new RequestParams<AbsenceDay>().eq('user_id', '1'));
  });
});
