export type WorkSchedule = {
  id: number;
  name: string;
  archived: number;
  editable: boolean;
  deletable: boolean;
  note: string;
  status: number;
};

export type WorkScheduleCreate = Omit<Partial<WorkSchedule>, 'id' | 'archived' | 'editable' | 'deletable' | 'status'>;

export type WorkScheduleUpdate = Pick<WorkSchedule, 'id'> &
  Omit<Partial<WorkSchedule>, 'archived' | 'editable' | 'deletable' | 'status' | 'id'>;
