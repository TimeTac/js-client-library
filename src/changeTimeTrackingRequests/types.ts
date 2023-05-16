type ChangeTimeTrackingRequestPossibleNestedEntities = 'timeTrackings';

export type ChangeTimeTrackingRequest = {
  id: number;
  type: string;
  time_tracking_id: number;
  request_user_id?: number;
  granted_user_id?: number;
  granted_as_substitute_user_id?: number;
  new_start_time?: string;
  new_end_time?: string;
  old_start_time?: string;
  old_end_time?: string;
  request_timestamp?: string;
  status?: string;
  /**
   * Comment from the user who created the request
   */
  request_user_comment?: string;
  /**
   * Comment from the user who handled the request.
   */
  granted_user_comment?: string;
  data_changed?: string;
  nestedEntities?: {
    [key in ChangeTimeTrackingRequestPossibleNestedEntities]: Array<Record<string, unknown>>;
  };
};

export type ChangeTimeTrackingRequestCreate = Omit<ChangeTimeTrackingRequest, 'id'>;
