import { expect } from '@jest/globals';
import axios from 'axios';

import AxiosMockAdapter from 'axios-mock-adapter';
import { ConfigProvider } from '../utils';
import { UpdateRawResponse } from '../utils/response/updateRawResponse';
import { ParsedErrorMessage } from '../utils/response/responseHandlers';
import { LibraryReturn } from '../utils/response/apiResponse';
import { RequestParamsBuilder } from '../utils/params/requestParams';
import { UserRead, UserUpdate, UserCreate, UserReadMe } from './types';
import { UsersEndpoint } from './';

const MockData: {
  userReadResult: UserRead[];
  userCreateData: UserCreate;
  userUpdateData: UserUpdate;
  userRawResponseUpdateData: UpdateRawResponse<UserRead>;
} = {
  userReadResult: [
    {
      id: 1,
      active: true,
      department_id: 1,
      department_id_valid_from: '2021-03-05',
      role_id: 1,
      start_task_at_login: 0,
      username: 'manager',
      personnel_number: 'MA0001',
      identity_card_number: 'K12345678A',
      lastname: 'Mustermann',
      firstname: 'Max',
      fullname: 'Mustermann Max',
      abbrevation: '',
      restrict_to_ip: false,
      permission_show_tt_ex_post_one_employees: true,
      permission_show_assign_favourites: true,
      permission_show_assign_todos: true,
      internal_cost_per_hour: 40,
      revenue_per_hour: 100,
      email_address: '',
      language_id: 2,
      phone: '',
      skype: '',
      profile_picture: '',
      u_iv_1: '0.00',
      u_iv_1_valid_from: '2021-03-05',
      u_iv_2: '',
      u_iv_2_valid_from: '2021-03-05',
      u_iv_3: '',
      u_iv_3_valid_from: '2021-03-05',
      u_iv_4: '',
      u_iv_4_valid_from: '2021-03-05',
      u_iv_5: '',
      u_iv_5_valid_from: '2021-03-05',
      u_iv_6: '',
      u_iv_6_valid_from: '2021-03-05',
      mobile_allowed: true,
      mobile_allow_live_timetracking: true,
      country_id: 0,
      allowed_ips: '',
      payroll_accounting_starts_at: '2021-03-05',
      payroll_accounting_initial_value_working_time_total_balance: 24,
      public_holiday_template_id: 14,
      public_holiday_template_id_valid_from: '2021-03-05',
      manual_timetracking: true,
      automatic_tracker_writing_task_id: 0,
      cost_acc_non_working_task_id: 0,
      phone_1: '',
      phone_2: '',
      birthday: '',
      entry_date: '',
      exit_date: '0000-00-00',
      notes: '',
      social_security_number: '',
      address_1: '',
      address_2: '',
      zip: '',
      permission_show_edit_user_user_settings: true,
      terminal_transponder_nr: '',
      external_id: '',
      company_name: '',
      timesheet_template_id: 1,
      timesheet_template_id_valid_starting_from: '2021-03-05',
      timesheet_holiday_calc_yearly_amount: 30,
      timesheet_holiday_calc_starting_from: '2022-01-01',
      timesheet_holiday_calc_interval_mode: 'y',
      working_time_balance_rule: 1,
      working_time_balance_rule_valid_from: '2021-03-05',
      overtime_allowance_included_overtime_hours_per_cycle: 0,
      payroll_accounting_initial_value_holiday: 0,
      timetac_product_id: 107,
      enable_module_employee_timetracking: true,
      enable_module_project_timetracking: true,
      enable_module_leave_management: true,
      enable_module_shift_planning: false,
      leave_note: '',
      request_substitute_user_id: 0,
      time_tracking_ex_post_earliest_working_time: '08:00:00',
      human: true,
    },
  ],
  userCreateData: {
    active: true,
    department_id: 1,
    username: 'manager',
    lastname: 'Mustermann',
    firstname: 'Max',
    password: 'abcdefg',
    language_id: 2,
    public_holiday_template_id: 14,
  },
  userUpdateData: {
    id: 1,
    firstname: 'xx1',
  },
  userRawResponseUpdateData: {
    data: {
      success: true,
      results: [],
      deleted: [],
      affected: {},
      apiResponse: {
        Host: '',
        Codeversion: '',
        Success: true,
        SuccessNested: true,
        ResourceName: '',
        RequestStartTime: '',
        RequestEndTime: '',
        ServerTimeZone: '',
      },
    },
  },
};

describe('Users', () => {
  const users: UsersEndpoint = new UsersEndpoint(new ConfigProvider({ account: 'testingAccount' }));
  const readPath = `${users.getResourcePath()}/read`;
  const mePath = `${users.getResourcePath()}/me`;
  const createPath = `${users.getResourcePath()}/create`;
  const updatePath = `${users.getResourcePath()}/update`;
  const inviteUsersPath = `${users.getResourcePath()}/invite`;
  const mock = new AxiosMockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: MockData.userReadResult });

    expect.assertions(1);

    await users.read().then((results: LibraryReturn<'users', UserRead[]>) => {
      expect(results).toStrictEqual({
        Results: MockData.userReadResult,
        Affected: {},
        Deleted: {},
      });
    });
  });

  test('readMe', async () => {
    mock.onGet(mePath).reply(200, { Success: true, NumResults: 1, Results: MockData.userReadResult });

    expect.assertions(1);

    await users.readMe().then((result) => {
      expect(result).toStrictEqual({
        Results: MockData.userReadResult[0],
        Affected: {},
        Deleted: {},
      });
    });
  });

  test('readMeRaw', async () => {
    mock.onGet(mePath).reply(200, {
      Success: true,
      NumResults: 1,
      Results: MockData.userReadResult,
      Host: 'foo.bar',
      Codeversion: '1.2.3',
      SuccessNested: true,
      RequestStartTime: '2024-01-01 01:23:45',
    });

    expect.assertions(1);

    await users.readMeRaw(new RequestParamsBuilder<UserReadMe>().build()).then((result) => {
      expect(result).toStrictEqual({
        data: {
          affected: {},
          apiResponse: {
            Results: MockData.userReadResult,
            Codeversion: '1.2.3',
            Host: 'foo.bar',
            NumResults: 1,
            RequestStartTime: '2024-01-01 01:23:45',
            Success: true,
            SuccessNested: true,
            _ignoreTypeGuard: undefined,
          },
          deleted: [],
          results: MockData.userReadResult,
          success: true,
        },
        pages: {
          current: {},
          prev: undefined,
          next: undefined,
        },
      });
    });
  });

  test('create', async () => {
    mock.onPost(createPath).reply(200, { Success: true, NumResults: 1, Results: MockData.userReadResult });

    expect.assertions(1);

    await users.create(MockData.userCreateData).then((results: LibraryReturn<'users', UserRead>) => {
      expect(results).toStrictEqual({
        Results: MockData.userReadResult[0],
        Affected: {},
        Deleted: {},
      });
    });
  });

  test('update', async () => {
    mock.onPut(updatePath).reply(200, { Success: true, NumResults: 1, Results: [], _ignoreTypeGuard: true });

    expect.assertions(1);

    await users.update(MockData.userUpdateData).then((results) => {
      expect(results).toStrictEqual({ Affected: {}, Deleted: {}, Results: undefined });
    });
  });

  test('Update Batch Success', async () => {
    const updateData = {
      id: 1,
      department_id: 2,
    };
    const childResult = {
      Success: true,
      SuccessNested: true,
      NumResults: 1,
      NumResultsNested: 1,
      Results: [updateData],
    };
    mock
      .onPut(updatePath)
      .reply(200, { SuccessBatch: true, Success: true, NumResults: 1, Results: [childResult, childResult], _ignoreTypeGuard: true });

    expect.assertions(1);

    const response = await users.update([
      {
        id: 1,
        department_id: 213,
      },
      {
        id: 10,
        department_id: 213,
      },
    ]);

    expect(response).toStrictEqual({ Affected: {}, Deleted: {}, Results: [updateData, updateData] });
  });

  test('Update test ApiResponseBatchOnFailure ', async () => {
    const failure = {
      Success: false,
      SuccessNested: false,
      Error: 422,
      ErrorMessage: 'Unprocessable Entity: department_id should be id of an existing department',
      ErrorExtended: {
        aErrorTranslationConstants: {
          '{{0}}': 'PM_DEPARTMENT_ID_MUST_EXIST',
        },
        errorCode: 'DEPARTMENT_ID_MUST_EXIST',
        errorString: 'department_id muss eine gültige id eines bestehenden departments sein',
        errorBaseString: '{{0}}',
      },
      ErrorInternal: 'Unprocessable Entity: department_id should be id of an existing department',
    };

    const updateData = {
      id: 1,
      department_id: 2,
    };

    const childResult = {
      Success: true,
      SuccessNested: true,
      NumResults: 1,
      NumResultsNested: 1,
      Results: [updateData],
    };

    mock
      .onPut(updatePath)
      .reply(200, { SuccessBatch: true, Success: true, NumResults: 1, Results: [childResult, failure], _ignoreTypeGuard: true });

    expect.assertions(1);

    const results = await users.update([
      {
        id: 1,
        department_id: 213,
      },
      {
        id: 10,
        department_id: 213,
      },
    ]);

    expect(results).toStrictEqual({
      Affected: {},
      Deleted: {},
      Results: [
        updateData,
        {
          code: failure.Error,
          message: failure.ErrorExtended.errorString,
          response: failure,
          //This is just a workaround as stack if different per environment, so we are not really testing new Error().stack
          stack: (results.Results[1] as ParsedErrorMessage).stack,
        },
      ],
    });
  });

  test('inviteUsers', async () => {
    const updateData = {
      firstname: 'Test',
      lastname: 'test',
      email_address: 'test.test@test.com',
    };

    const childResult = {
      Success: true,
      SuccessNested: true,
      NumResults: 1,
      NumResultsNested: 1,
      Results: [updateData],
    };
    mock
      .onPost(inviteUsersPath)
      .reply(200, { SuccessBatch: true, Success: true, NumResults: 1, Results: [childResult], _ignoreTypeGuard: true });

    expect.assertions(1);

    const response = await users.inviteUsers([updateData]);

    expect(response).toStrictEqual({ Affected: {}, Deleted: {}, Results: [updateData] });
  });
});
