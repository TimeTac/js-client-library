export type WorkScheduleDay = {
  id: number;
  timesheet_template_id: number;
  weekday_id: number;
  weekday: string;
  workday: boolean;
  half_holiday: boolean;
  hours: number;
  core_time_start: string;
  core_time_end: string;
  core_time_start_tolerance: number;
  core_time_end_tolerance: number;
};

export type WorkScheduleDayUpdate = Omit<Partial<WorkScheduleDay>, 'timesheet_template_id' | 'weekday_id'>;
