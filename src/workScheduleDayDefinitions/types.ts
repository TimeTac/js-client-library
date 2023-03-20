export type WorkScheduleDayDefinition = {
  id: number;
  timesheet_template_id: number;
  weekday_id: number;
  slot_id: number;
  start: string;
  end: string;
};

export type WorkScheduleDayDefinitionCreate = Omit<Partial<WorkScheduleDayDefinition>, 'id'>;

export type WorkScheduleDayDefinitionUpdate = Omit<Partial<WorkScheduleDayDefinition>, 'timesheet_template_id' | 'weekday_id'>;
