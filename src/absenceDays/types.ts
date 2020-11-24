export type AbsenceDay = {
  id: number;
  user_id: number;
  user_department_id: number;
  user_role_id: number;
  date: string;
  type: string;
  value: number;
  value_unit: string;
  request_id: number;
  status: number;
  comment: string;
  begin: string;
  updated: string | null;
  type_id: number;
  subtype_id: number;
};
