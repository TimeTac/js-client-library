import { AbsenceDurationUnit, AbsenceTypeRequestType } from '../enums';

export type AbsenceType = {
  /**
   * Id of the absence.
   */
  id: number;
  /**
   * Id of the absence type.
   */
  absence_type_id: number;
  /**
   * Id of the sub absence (other paid leaves).
   */
  absence_subtype_id: number;
  /**
   * Group of the absence defined in pm_absece_groups.
   */
  absence_group_id: number;
  /**
   * Sort order in views.
   */
  sort_order: number;
  /**
   * Absence name.
   */
  name_const: string;
  /**
   * Absence abbrevation constant.
   */
  abbreviation_const: string;
  /**
   * If the absence is shown in the selection for user.
   */
  show_in_selection: boolean;
  /**
   * The task_id of pm_tasks_subprojects which will be used to automatically create timestamps based on the absence.
   */
  cost_acc_task_id?: number;
  /**
   * If the users can request this absence.
   */
  enabled_for_requests: boolean;
  /**
   * If the leave should be added to working hours.
   */
  add_to_working_hours?: boolean;
  /**
   * If 0, the the user cannot enter more time of the day of absence as the target working hour according to his working time model.
   */
  allow_tracking_more_then_target_working_hours?: boolean;
  /**
   * The possible types are WORKFLOW, USER, HR_MANAGER, MANAGER, SYSTEM
   */
  request_type?: AbsenceTypeRequestType;
  /**
   * Whether the absence can be entered on a non working day like weekends and public holidays
   */
  allow_entry_on_non_working_days?: boolean;
  /**
   * Whether the type of absence ALWAYS will be shown in the team calendar independently of the user setting: "Show type of absence..."
   */
  public_leave_type?: boolean;
  /**
   * Whether the comment field in the application window needs to be filled out by the applicant.
   */
  comment_is_mandatory?: boolean;
  /**
   * Whether the comment field in the rejection window is mandatory or not.
   */
  reject_request_comment_is_mandatory?: boolean;
  /**
   * This JSON setting tells which days should be shown in the request window for the duration. Defaults are 0.25, 0.50, 0.75 and 1. Amounts can be added, removed or changed. The value needs to be a valid JSON string. The durations are procentual digits separated by a comma. (so for 0.10 add 10).
   */
  show_day_amount_config?: string;
  /**
   * Duration unit of the absence (hours or days).
   */
  duration_unit: AbsenceDurationUnit;
  /**
   * Whether the user limitation config is enabled for this absence.
   */
  enable_user_limitations?: boolean;
  /**
   * If enable_user_limitations is enabled, the JSON config for the limitation
   */
  user_limitations_config?: string;
  /**
   * Whether to enable/disable the substitute mode for the leave type. e.g. usually during the absence home office we dont need the substitute to handle all requests.
   */
  enable_for_substitute_mode?: boolean;
  /**
   * If request_type = "USER" and the user enters an absence, a notification email will be sent to the responsible manager.
   */
  send_email_notification_to_responsible_manager?: boolean;
  /**
   * If a manager enters an absence for somebody else, this person will be notified by email of this entry.
   */
  send_email_notification_to_user_if_entered_by_manager?: boolean;
  /**
   * The HEX code for the color to be shown in the holiday planers.
   */
  color: string;
  /**
   * If there is a country restriction for this other paid leave. The limitations are defined in pm_working_hour_other_paid_leave_to_countries.
   */
  restrict_for_country?: boolean;
  /**
   * If a replacement is needed for this absence.
   */
  absence_window_show_replacement?: boolean;
  /**
   * Datev key
   */
  datev_absence_key?: string;
  /**
   * Datev wage type id
   */
  datev_wage_type_id?: number;
  individual_value_1?: string;
  /**
   * Tells if user can edit it in app.
   */
  is_visible_for_edit?: boolean;
};

type CycleFields = {
  /**
   * Indicates the cycle of personal days being used.
   */
  cycle_id?: number;
  /**
   * Says how many personal days are in the cycle.
   */
  cycle_max_days?: number;
};

export type AbsenceTypeCreate = Omit<AbsenceType, 'id'> & CycleFields;

export type AbsenceTypeUpdate = Partial<
  Omit<
    AbsenceType,
    'absence_type_id' &
      'absence_subtype_id' &
      'absence_group_id' &
      'default_other_paid_leave' &
      'cost_acc_task_id' &
      'duration_unit' &
      'datev_wage_type_id' &
      'is_visible_for_edit'
  >
> & {
  id: number;
} & CycleFields;
