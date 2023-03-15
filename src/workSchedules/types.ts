export type WorkSchedule = {
  id: number;
  name: string;
  archived: number;
  note: string;
  status: number;
};

export type WorkScheduleCreate = Omit<Partial<WorkSchedule>, 'id' | 'archived' | 'status'>;

export type WorkScheduleUpdate = Omit<Partial<WorkSchedule>, 'archived' | 'status'>;
