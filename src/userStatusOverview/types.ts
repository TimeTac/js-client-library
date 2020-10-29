export type UserStatusOverview = {
  user_id?: number;
  /**
   * Time tracking id of a running task
   */
  time_tracking_id?: number;
  time_tracking_start_time?: string;
  time_tracking_start_time_timezone_id?: string;
  time_tracking_task_id?: number;
  time_tracking_is_nonworking?: boolean;
  /**
   * 1 if there is core time violation, default 0
   */
  core_time_violation?: boolean;
  core_time_start?: string;
  updated?: string;
  is_running?: boolean;
  /**
   * Current absence ids
   */
  current_absence_ids?: string;
  /**
   * Represents current status of users activity if he is offline (0), working(1),break(2),on leave(3), core time violation (5)
   */
  status?: number;
};
