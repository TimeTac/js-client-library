export type WorkSchedule = {
  id: number;
  name: string;
  archived: number;
  editable: boolean;
  deletable: boolean;
  note: string;
  status: number;
  law_limit_daily_hours: number;
  law_limit_weekly_hours: number;
  law_rest_period_minimum_hours: number;
  law_rest_period_minimum_weekly_hours: number;
  type?: string;
  is_default?: boolean;
  absence_credit?: number;
  automatic_break_template_id?: number | null;
  rounding_times_template_id?: number | null;
  public_holiday_template_id?: number | null;
  minijobber_deduction_cycle?: string;
};

export type WorkScheduleCreate = Omit<
  Partial<WorkSchedule>,
  | 'id'
  | 'archived'
  | 'editable'
  | 'deletable'
  | 'status'
  | 'law_limit_daily_hours'
  | 'law_limit_weekly_hours'
  | 'law_rest_period_minimum_hours'
  | 'law_rest_period_minimum_weekly_hours'
  | 'is_default'
  | 'minijobber_deduction_cycle'
>;

export type WorkScheduleUpdate = Pick<WorkSchedule, 'id'> &
  Omit<
    Partial<WorkSchedule>,
    | 'archived'
    | 'editable'
    | 'deletable'
    | 'status'
    | 'id'
    | 'law_limit_daily_hours'
    | 'law_limit_weekly_hours'
    | 'law_rest_period_minimum_hours'
    | 'law_rest_period_minimum_weekly_hours'
    | 'is_default'
  >;
