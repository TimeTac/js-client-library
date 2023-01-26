import axios from 'axios';
import { expect } from '@jest/globals';
import AxiosMockAdapter from 'axios-mock-adapter';
import { ConfigProvider } from '../utils';
import { AbsenceDurationUnit, AbsenceTypeRequestType } from '../enums';
import { AbsenceTypesEndpoint } from './index';

const mockResponseData = {
  absenceType: [
    {
      sort_order: 0,
      name_const: 'string',
      abbreviation_const: 'string',
      show_in_selection: true,
      enabled_for_requests: true,
      add_to_working_hours: true,
      allow_tracking_more_then_target_working_hours: true,
      request_type: 'string',
      allow_entry_on_non_working_days: true,
      public_leave_type: true,
      comment_is_mandatory: true,
      reject_request_comment_is_mandatory: true,
      show_day_amount_config: 'string',
      enable_user_limitations: true,
      user_limitations_config: 'string',
      enable_for_substitute_mode: true,
      send_email_notification_to_responsible_manager: true,
      send_email_notification_to_user_if_entered_by_manager: true,
      color: 'string',
      restrict_for_country: true,
      absence_window_show_replacement: true,
      datev_absence_key: 'st',
      datev_wage_type_id: 0,
      individual_value_1: 'string',
      is_visible_for_edit: true,
    },
  ],
};

const mockUpdatePayloadData = {
  absenceType: {
    id: 0,
    sort_order: 0,
    name_const: 'string',
    abbreviation_const: 'string',
    show_in_selection: true,
    enabled_for_requests: true,
    add_to_working_hours: true,
    allow_tracking_more_then_target_working_hours: true,
    request_type: AbsenceTypeRequestType.HRManager,
    allow_entry_on_non_working_days: true,
    public_leave_type: true,
    comment_is_mandatory: true,
    reject_request_comment_is_mandatory: true,
    show_day_amount_config: 'string',
    enable_user_limitations: true,
    user_limitations_config: 'string',
    enable_for_substitute_mode: true,
    send_email_notification_to_responsible_manager: true,
    send_email_notification_to_user_if_entered_by_manager: true,
    color: 'string',
    restrict_for_country: true,
    absence_window_show_replacement: true,
    datev_absence_key: 'st',
    individual_value_1: 'string',
    absence_type_id: 0,
    absence_subtype_id: 0,
    absence_group_id: 0,
    duration_unit: AbsenceDurationUnit.Days,
  },
};

const mockCreatePayloadData = {
  absenceType: {
    sort_order: 0,
    name_const: 'string',
    abbreviation_const: 'string',
    show_in_selection: true,
    enabled_for_requests: true,
    add_to_working_hours: true,
    allow_tracking_more_then_target_working_hours: true,
    request_type: AbsenceTypeRequestType.HRManager,
    allow_entry_on_non_working_days: true,
    public_leave_type: true,
    comment_is_mandatory: true,
    reject_request_comment_is_mandatory: true,
    show_day_amount_config: 'string',
    enable_user_limitations: true,
    user_limitations_config: 'string',
    enable_for_substitute_mode: true,
    send_email_notification_to_responsible_manager: true,
    send_email_notification_to_user_if_entered_by_manager: true,
    color: 'string',
    restrict_for_country: true,
    absence_window_show_replacement: true,
    datev_absence_key: 'st',
    datev_wage_type_id: 0,
    individual_value_1: 'string',
    is_visible_for_edit: true,
    absence_type_id: 0,
    absence_subtype_id: 0,
    absence_group_id: 0,
    duration_unit: AbsenceDurationUnit.Days,
  },
};

describe('AbsenceTypesEndpoint', () => {
  const absenceTypes = new AbsenceTypesEndpoint(new ConfigProvider({ account: 'testingAccount' }));
  const mock = new AxiosMockAdapter(axios);
  const createPath = `${absenceTypes.getResourcePath()}/create`;
  const updatePath = `${absenceTypes.getResourcePath()}/update`;

  afterEach(() => {
    mock.reset();
  });

  test('create', async () => {
    mock.onPost(createPath).reply(200, { Success: true, NumResults: 1, Results: mockResponseData.absenceType });
    const results = await absenceTypes.create(mockCreatePayloadData.absenceType);
    expect(results).toStrictEqual({
      Results: mockResponseData.absenceType,
      Affected: {},
      Deleted: [],
    });
  });
  test('update', async () => {
    mock.onPut(updatePath).reply(200, { Success: true, NumResults: 1, Results: mockResponseData.absenceType });
    const results = await absenceTypes.update(mockUpdatePayloadData.absenceType);
    expect(results).toStrictEqual({
      Results: mockResponseData.absenceType,
      Affected: {},
      Deleted: [],
    });
  });
});
