import { TimesheetActionLogs } from '../timesheetActionLogs/types';

export type HolidayAdjustmentAdd = Pick<TimesheetActionLogs, 'user_id' | 'date' | 'value' | 'comment'>;
export type HolidayAdjustmentRemove = Pick<TimesheetActionLogs, 'user_id' | 'date'>;
