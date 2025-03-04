export enum TimeTrackingChangelogsReasons {
  Default = 0,
  AutomaticBreakCalculations = 1,
  AutomaticTimerRounding = 2,
}

export enum TimeTrackingChangelogsChangeTypes {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export type TimeTrackingChangelogs = {
  id: number;
  change_timestamp: string;
  change_type: TimeTrackingChangelogsChangeTypes;
  change_reason_id: TimeTrackingChangelogsReasons;
  change_user_id: number;
  tracker_id: number;
  user_id: number;
  task_id: number;
  start_time: string;
  new_start_time: string;
  end_time: string;
  new_end_time: string;
  duration: number;
};
