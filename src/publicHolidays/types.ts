export type PublicHolidays = {
  id: number;
  template_id: number;
  date: string;
  name: string;
  value: number;
  status: string;
};

export type PublicHolidaysCreate = Omit<PublicHolidays, 'id' | 'status'> & {
  _skipCheckForExistingAbsencesAndApprovedDatesValidator?: boolean;
};

export type PublicHolidaysUpdate = {
  id: number;
  active?: number;
  name?: string;
  date?: string;
  value?: number;
};
