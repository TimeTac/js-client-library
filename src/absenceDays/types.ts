import { AbsenceStatus, DurationUnit } from '../absences/types';

export enum AbsenceDayType {
  Holiday = 'holiday',
  OvertimeReduction = 'overtime_reduction',
  OtherPaidLeave = 'other_paid_leave',
  SickLeave = 'sick_leave',
  PublicHoliday = 'public_holiday',
}

export type AbsenceDay = {
  id: number;
  user_id: number;
  user_department_id: number;
  user_role_id: number;
  date: string;
  type: AbsenceDayType;
  value: number;
  value_unit: DurationUnit;
  request_id: number;
  status: AbsenceStatus;
  comment: string;
  begin: string;
  updated: string | null;
  type_id: number;
  subtype_id: number;
};
