export type TimesheetAccounting = {
  id: number;
  user_id: number;
  department_id?: number;
  /**
   * The department role id to which the user (user_id) was assigned at the time of timesheetAccounting
   */
  user_role_id?: number;
  date?: string;
  approved_by_user?: boolean;
  approved_by_admin?: boolean;
  approved_by_user_1?: boolean;
  ordinary_hours?: number;
  target_working_hours?: number;
  begin_time?: string;
  end_time?: string;
  break?: number;
  flexible_working_time?: number;
  core_working_time?: number;
  working_time?: number;
  /**
   * Planned time of day
   */
  working_time_planned?: number;
  user_defined_time_1?: number;
  user_defined_time_2?: number;
  user_defined_time_3?: number;
  user_defined_time_4?: number;
  user_defined_time_5?: number;
  user_defined_time_6?: number;
  user_defined_time_7?: number;
  user_defined_time_8?: number;
  user_defined_time_9?: number;
  user_defined_time_10?: number;
  user_defined_time_11?: number;
  user_defined_time_12?: number;
  excess_work?: number;
  excess_work_consumption?: number;
  excess_work_adjustments?: number;
  excess_work_balance?: number;
  overtime_1?: number;
  overtime_1_consumption?: number;
  overtime_1_adjustments?: number;
  overtime_1_balance?: number;
  overtime_2?: number;
  overtime_2_consumption?: number;
  overtime_2_adjustments?: number;
  overtime_2_balance?: number;
  overtime_3?: number;
  overtime_3_consumption?: number;
  overtime_3_adjustments?: number;
  overtime_3_balance?: number;
  overtime_4?: number;
  overtime_4_consumption?: number;
  overtime_4_adjustments?: number;
  overtime_4_balance?: number;
  overtime_5?: number;
  overtime_5_consumption?: number;
  overtime_5_adjustments?: number;
  overtime_5_balance?: number;
  overtime_6?: number;
  overtime_6_consumption?: number;
  overtime_6_adjustments?: number;
  overtime_6_balance?: number;
  total_working_time?: number;
  paid_nonworking_time?: number;
  paid_nonworking_time_set_by_user?: number;
  total_working_time_incl_paid_non_working_time?: number;
  working_time_daily_balance?: number;
  working_time_daily_balance_incl_standby?: number;
  additions?: number;
  overtime_allowance?: number;
  overtime_paid?: number;
  overtime_reduction?: number;
  working_time_total_balance?: number;
  public_holiday?: number;
  holiday?: number;
  holiday_adjustments?: number;
  holiday_balance?: number;
  tmp_holiday_balance?: number;
  sick_leave?: number;
  sick_leave_adjustments?: number;
  sick_leave_balance?: number;
  other_paid_leave?: number;
  other_paid_leave_id?: number;
  user_defined_day_1?: number;
  user_defined_day_1_adjustments?: number;
  user_defined_day_1_balance?: number;
  user_defined_day_2?: number;
  user_defined_day_2_adjustments?: number;
  user_defined_day_2_balance?: number;
  user_defined_day_3?: number;
  user_defined_day_3_adjustments?: number;
  user_defined_day_3_balance?: number;
  user_defined_day_4?: number;
  user_defined_day_5?: number;
  user_defined_day_6?: number;
  user_defined_day_7?: number;
  user_defined_day_8?: number;
  user_defined_day_9?: number;
  user_defined_day_10?: number;
  user_defined_day_11?: number;
  user_defined_day_12?: number;
  comment?: string;
  data_changed?: string;
  break_law_check: number;
  workday: boolean;
  weekday?: number;
  /**
   * Meant to allow grouping by year
   */
  year?: number;
  /**
   * Meant to allow grouping by month
   */
  month?: number;
  /**
   * Meant to allow grouping by week
   */
  week?: number;
  law_limit_daily_hours_violation: boolean;
  law_limit_weekly_hours_violation: boolean;
  core_time_violation: boolean;
  break_law_violation: boolean;
  rest_period_violation: boolean;
  rest_period_weekly_violation: boolean;
  plausibility_conflict_violation: boolean;
  paid_break?: number;
  unpaid_break?: number;
  paid_break_details?: string;
  unpaid_break_details?: string;
};

export type TimesheetAccountingApproveRequest = {
  user_id: number;
  date: string;
  approved_by_user?: boolean;
  approved_by_admin?: boolean;
  approved_by_user_1?: boolean;
};

export type TimesheetAccountingUpdate = Pick<TimesheetAccounting, 'id' | 'user_id' | 'date' | 'overtime_paid'>;
