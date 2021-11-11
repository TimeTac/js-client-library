export type AbsenceBan = {
  id: number;
  department_id?: number;
  reason: string;
  date_from: string;
  date_to: string;
};

export type AbsenceBanCreate = Omit<AbsenceBan, 'id'>;

export type AbsenceBanUpdate = Partial<AbsenceBan> & { id: number };
