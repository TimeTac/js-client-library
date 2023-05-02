import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { ConfigProvider } from '../utils';
import { TimesheetAccountingApproveRequest, TimesheetAccounting } from './types';
import { TimesheetAccountingsEndpoint } from './index';

describe('TimesheetAccountingsEndpoint', () => {
  const sampleRequest: TimesheetAccountingApproveRequest = {
    date: '2023-12-21 11:11:11',
    user_id: 1,
    approved_by_admin: true,
  };

  const sampleResponse: TimesheetAccounting[] = [
    {
      break_law_check: 1,
      break_law_violation: false,
      core_time_violation: false,
      id: 1,
      law_limit_daily_hours_violation: true,
      law_limit_weekly_hours_violation: false,
      rest_period_violation: false,
      rest_period_weekly_violation: true,
      user_id: 1,
      workday: true,
    },
  ];
  const clients = new TimesheetAccountingsEndpoint(new ConfigProvider({ account: 'timesheetAccountings' }));
  const approvePath = `${clients.getResourcePath()}/approve`;
  const mock = new AxiosMockAdapter(axios);
  afterEach(() => {
    mock.reset();
  });
  test('approve', async () => {
    mock.onPut(approvePath).reply(200, { Success: true, NumResults: 1, Results: sampleResponse });
    const result = await clients.approve(sampleRequest);
    expect(result).toStrictEqual({
      Results: sampleResponse,
      Affected: {},
      Deleted: [],
    });
  });
});
