/**
 * Some user have limited read permission,
 * so they only receive following fields
 */
export type UserReadObscured = {
  id: number;
  active: boolean;
  department_id: number;
  lastname: string;
  firstname: string;
  email_address: string;
  phone: string;
  skype: string;
  profile_picture: string;
  allow_start_task?: boolean;
  leave_note: string | null;
};

export type UserReadFull = UserReadObscured & {
  department_id_valid_from: string;
  role_id: number;
  start_task_at_login: number;
  username: string;
  personnel_number: string;
  fullname?: string;
  // Note: misspelling is intentional abbrevAtion
  abbrevation: string;
  restrict_to_ip: boolean;
  permission_show_tt_ex_post_one_employees: boolean;
  permission_show_assign_favourites: boolean;
  permission_show_assign_todos: boolean;
  internal_cost_per_hour: number;
  revenue_per_hour: number;
  language_id: number;
  u_iv_1: string;
  u_iv_1_valid_from: string;
  u_iv_2: string;
  u_iv_2_valid_from: string;
  u_iv_3: string;
  u_iv_3_valid_from: string;
  u_iv_4: string;
  u_iv_4_valid_from: string;
  u_iv_5: string;
  u_iv_5_valid_from: string;
  u_iv_6: string;
  u_iv_6_valid_from: string;
  mobile_allowed: boolean;
  mobile_allow_live_timetracking: boolean;
  country_id: number;
  allowed_ips: string;
  payroll_accounting_starts_at: string;
  payroll_accounting_initial_value_working_time_total_balance: number;
  public_holiday_template_id: number;
  public_holiday_template_id_valid_from: string;
  manual_timetracking: boolean;
  automatic_tracker_writing_task_id: number;
  cost_acc_non_working_task_id: number;
  phone_1: string;
  phone_2: string;
  birthday: string;
  entry_date: string;
  exit_date: string;
  notes: string;
  social_security_number: string;
  address_1: string;
  address_2: string;
  zip: string;
  permission_show_edit_user_user_settings: boolean;
  terminal_transponder_nr: string;
  external_id: string;
  company_name: string;
  timesheet_template_id: number;
  timesheet_template_id_valid_starting_from: string;
  timesheet_holiday_calc_yearly_amount: number;
  timesheet_holiday_calc_starting_from: string;
  timesheet_holiday_calc_interval_mode: string;
  working_time_balance_rule: number;
  working_time_balance_rule_valid_from: string;
  overtime_allowance_included_overtime_hours_per_cycle: number;
  payroll_accounting_initial_value_holiday: number;
  timetac_product_id: number;
  enable_module_employee_timetracking: boolean;
  enable_module_project_timetracking: boolean;
  enable_module_leave_management: boolean;
  enable_module_shift_planning: boolean;
  enable_module_timetac_health: boolean;
  request_substitute_user_id: number;
  time_tracking_ex_post_earliest_working_time: string;
  health_rule_id: number;
  health_rule_id_valid_from: string;
  health_checker: boolean;
  human: boolean;
};

export type UserRead = UserReadFull | UserReadObscured;

export type User = UserRead;

export interface UserCreate extends Partial<UserReadFull> {
  department_id: number;
  lastname: string;
  firstname: string;
  username: string;
  password: string;
  language_id: number;
  public_holiday_template_id: number;
}

export interface UserReadMe extends UserReadFull {
  renew_password: boolean;
  last_login: string;
}

export interface UserUpdate extends Partial<UserReadFull> {
  id: number;
  department_id?: number;
}

export interface UserResetPassword {
  username: string;
  client_id?: string;
}

export interface UserUpdatePassword {
  id: number;
  password: string;
  old_password: string;
}
