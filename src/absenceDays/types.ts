export interface AbsenceDay {
  id?: number;
  user_id: number;
  user_department_id: number;
  user_role_id?: number;
  date: string;
  type?: string;
  other_paid_leave_id?: number;
  value?: number;
  value_unit?: string;
  request_id?: number;
  status?: number;
  comment?: string;
  begin?: string;
  updated?: string;
}
