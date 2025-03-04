export type UserTemplateHistory = {
  id: number;
  user_id: number;
  template_id: number;
  template_hours: number;
  valid_from: string;
  change_type: string;
  created_at: null | string;
};

export type UserTemplateHistoryView = {
  id: number;
  user_id: number;
  valid_from: string;
  all_in: boolean;
  overtime_allowance_hours: number;
  timesheet_template_name: string;
  public_holiday_template_name: string;
  cycle_name: string;
  rule_name: string;
  clear_working_time_saldo: number;
  created_at: string;
};
