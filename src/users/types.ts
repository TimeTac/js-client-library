export type UserRead = {
  id: number;
  profile_picture: string;
  department_id_valid_from: string;
  internal_user_group: number;
  active: boolean;
  hr_manager: boolean;
  department_id: number;
  role_id: number;
  start_task_at_login: number;
  username: string;
  personnel_number: string;
  lastname: string;
  firstname: string;
  fullname: string;
  // Note: misspelling is intentional abbrevAtion
  abbrevation: string;
  restrict_to_ip: boolean;
  permission_change_all_timers: boolean;
  permission_change_assigned_user_timers: boolean;
  permission_change_own_timers: boolean;
  permission_statistic_for_all_users: boolean;
  permission_hr_statistic_for_all_users: boolean;
  permission_show_tt_ex_post_one_employees: boolean;
  permission_show_tt_ex_post_more_employees: boolean;
  permission_show_assign_favourites: boolean;
  permission_show_assign_todos: boolean;
  permission_edit_tasks_projects: boolean;
  permission_show_settings_pm_skills: boolean;
  permission_show_settings_client_list: boolean;
  internal_cost_per_hour: number;
  revenue_per_hour: number;
  email_address: string;
  language_id: number;
  phone: string;
  skype: string;
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
  gender: string;
  country_id: number;
  allowed_ips: string;
  payroll_accounting_starts_at: string;
  payroll_accounting_initial_value_working_time_total_balance: number;
  public_holiday_template_id: number;
  public_holiday_template_id_valid_from: string;
  manual_timetracking: boolean;
  automatic_tracker_writing_task_id: number;
  cost_acc_non_working_task_id: number;
  allow_start_task: boolean;
  allow_cancel_holiday_request: boolean;
  salutation_id: number;
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
  allow_to_see_other_user_leave_type: boolean;
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
  leave_note: string;
  request_substitute_user_id: number;
  time_tracking_ex_post_earliest_working_time: string;
  show_status_overview: boolean;
  last_login: string;
};

export type User = UserRead;

export interface UserCreate extends Partial<UserRead> {
  internal_user_group: number;
  department_id: number;
  lastname: string;
  firstname: string;
  username: string;
  password: string;
  language_id: number;
  public_holiday_template_id: number;
}

export interface UserUpdate extends Partial<UserRead> {
  id: number;
}

export interface UserResetPassword {
  username: string;
}

export interface UserUpdatePassword {
  id: number;
  password: string;
}
