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
    mock.onGet('https://go.timetac.com/undefined/userapi/v3/absencesDays/read').reply(200, { Success: true, NumResults: 2, Results: {} });
    const result: Promise<AbsenceDay[]> = absenceDays.read(new RequestParams<AbsenceDay>().eq('user_id', '1'));
  });
});
