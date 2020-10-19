export interface TimeTracking {
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
   * Timezone needs to be set if end_time field value is set
   */
  end_time_timezone?: string;
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
}

export interface StartTimeTrackingData extends Omit<TimeTracking, 'id' | 'task_id'> {
  task_id?: number;
}

export interface StopTimeTrackingData extends Omit<TimeTracking, 'id' | 'task_id' | 'end_time_timezone'> {
  end_time_timezone: string;
}
