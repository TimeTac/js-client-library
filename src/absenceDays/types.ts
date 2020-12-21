import { AbsenceDayType, AbsenceDurationUnit, AbsenceStatus } from '../enums';

export type AbsenceDay = {
  id: number;
  user_id: number;
  user_department_id: number;
  user_role_id: number;
  date: string;
  type: AbsenceDayType;
  value: number;
  value_unit: AbsenceDurationUnit;
  request_id: number;
  status: AbsenceStatus;
  comment: string;
  begin: string;
  updated: string | null;
  type_id: number;
  subtype_id: number;
};
