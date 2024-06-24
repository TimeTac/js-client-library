export type TimesheetActionLogs = {
  id: number;
  user_id: number;
  user_department_id: number | null;
  user_role_id: number | null;
  date: string;
  type: string | null;
  other_paid_leave_id: number | null;
  value: number;
  value_unit: string | null;
  request_id: number | null;
  status: number | null;
  comment: string | null;
  begin: string | null;
  updated: string | null;
  from_date: string | null;
  data: string;
};
