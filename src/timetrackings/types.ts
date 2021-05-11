export interface TimeTracking {
  /**
   * Mandatory if action in UPDATE
   */
  id: number;
  user_id: number;
  task_id: number;
  start_time?: string; // dateTimeString ??
  end_time?: string; // dateTimeString ??
  /**
   * Timezone, eg. Europe/Vienna, that is mandatory if action is CREATE
   */
  start_time_timezone?: string;
  /**
   * Timezone id for start_time
   */
  start_time_timezone_id?: number;
  /**
   * Timezone needs to be set if end_time field value is set
   */
  end_time_timezone?: string;
  /**
   * Timezone id for end_time
   */
  end_time_timezone_id?: number;
  /**
   * The department id to which the timetrackings user (pm_time_tracking.user_id)
   * was assigned at the time start_date of the timeTracking.
   */
  department_id?: number;
  /**
   * The department role id to which the timetrackings user (pm_time_tracking.user_id)
   * was assigned at the time start_date of the timeTracking.
   */
  department_role_id?: number;
  start_time_offset?: number;
  end_time_offset?: number;

  /**
   * Used for toggle action.
   * If there is no running time tracking, start_time_timezone will be started in this timezone
   * If there is a running time tracking, end_time_timezone will be stopped in this timezone
   */
  timezone?: string;
  /**
   * Whether the start of the timer was booked live or not
   */
  is_start_live?: boolean;
  /**
   * Whether the end of the timer was booked live or not
   */
  is_end_live?: boolean;
  time?: string;
  duration?: number;
  status?: number;
  start_ip?: string;
  end_ip?: string;
  is_statistic_countable?: boolean;
  max_hours_alert?: boolean;
  input_type?: number;
  t_iv_1?: string;
  t_iv_2?: string;
  t_iv_3?: string;
  t_iv_4?: string;
  t_iv_5?: string;
  t_iv_6?: string;
  u_iv_1?: string;
  u_iv_2?: string;
  u_iv_3?: string;
  u_iv_4?: string;
  u_iv_5?: string;
  u_iv_6?: string;
  /**
   * if 1, admin has approved time tracking entry (no change possible)
   */
  approved_by_admin?: boolean;
  geo_start_lat?: number;
  geo_start_long?: number;
  geo_start_accuracy?: number;
  geo_end_lat?: number;
  geo_end_long?: number;
  geo_end_accuracy?: number;
  geo_lat?: number;
  geo_long?: number;
  geo_accuracy?: number;
  updated?: string;
  /**
   * Id of latest time tracking change request
   */
  last_change_time_tracking_request_id?: number;
  /**
   * Special unique case: If a to-be-inserted value is not null and exists already,
   * the create action should successfully return the existing row instead of creating
   * (and no unique error)
   */
  client_unique_id?: string;
  /**
   * 0 = post-dated, 1 = live, 2 = nfc
   */
  start_type_id?: number;
  /**
   * 0 = post-dated, 1 = live, 2 = nfc
   */
  end_type_id?: number;
  notes?: string;
  is_billable?: boolean;
  is_nonworking?: boolean;
  is_paid_non_working?: boolean;
  _temp_record_id?: string;
}
export type TimeTrackingCreate = Omit<TimeTracking, 'id'>;
export type TimeTrackingUpdate = Pick<TimeTracking, 'id'> &
  Partial<
    Omit<
      TimeTracking,
      | 'user_id'
      | 'department_id'
      | 'department_role_id'
      | 'start_date'
      | 'start_time__timezone_hours_to_add'
      | 'end_time__timezone_hours_to_add'
      | 'timezon'
      | 'is_start_live'
      | 'is_end_live'
      | 'time'
      | 'duration'
      | 'status'
      | 'start_ip'
      | 'end_ip'
      | 'is_statistic_countable'
      | 'input_type'
      | 'is_nonworking'
      | 'status_invoicing'
      | 'invoice_id'
      | 'geo_lat'
      | 'geo_long'
      | 'geo_accuracy'
      | 'updated'
      | 'last_change_time_tracking_request_id'
      | 'client_unique_id'
      | 'is_paid_non_working'
      | 'inherited_user_ids'
      | 'grantedUserComment'
      | 'entityToCreateOnSplit'
    >
  >;
export interface StartTimeTrackingData extends Omit<TimeTracking, 'id' | 'task_id'> {
  task_id?: number;
}

export interface StopTimeTrackingData extends Omit<TimeTracking, 'id' | 'task_id' | 'end_time_timezone'> {
  end_time_timezone: string;
}

export interface ToggleTimeTrackingData extends Pick<TimeTracking, 'user_id' | 'timezone'> {
  timezone: string;
}
