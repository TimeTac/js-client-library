export enum AbsenceStatus {
  Open,
  Granted,
  Declined,
  Cancelled,
  OpenWaitingForReplacement = 5,
}

export type Absence = {
  id: number;
  type_id: number;
  subtype_id: number;
  user_id: number;
  /**
   * The user replacement for this request.
   */
  replacement_user_id?: number;
  /**
   * The department id to which the request user (request_user_id)
   * was assigned at the time of holiday request
   */
  request_user_department_id?: number;
  /**
   * The department role id to which the request user (request_user_id)
   *  was assigned at the time of holiday request
   */
  request_user_role_id?: number;
  created: string;
  status: AbsenceStatus;
  granted_user_id?: number;
  granted_as_substitute_user_id?: number;
  granted_timestamp?: string;
  request_comment?: string;
  granted_comment?: string;
  from_date: string;
  to_date: string;
  duration: number;
  /**
   * If the request ends with a partial day, the value of the last partial day.
   */
  request_partial_begin_duration?: number;
  /**
   * If the request begins with a partial day, the value of the first partial day.
   */
  request_partial_end_duration?: number;
  duration_unit: 'd' | 'hs';
  begin?: string;
  substitute_enabled?: boolean;
  /**
   * Arbitrary data for requests
   */
  individual_value_1?: string;
  /**
   * If the multistage approval for this reuest is active.
   */
  is_multistage_request?: boolean;
  /**
   * The last level in the chain responsibility table (autoupdated) that is not approved yet
   */
  chain_level?: number;
  updated: string;
};

export interface AbsenceCreate extends Omit<Absence, 'id' | 'created' | 'status' | 'duration' | 'duration_unit' | 'updated'> {}

export interface AbsenceApprove {
  id: number;
  granted_comment?: string;
  substitute_enabled?: boolean;
}

export interface AbsenceReject extends AbsenceApprove {}

export interface AbsenceUpdate extends Partial<Absence> {
  id: number;
}
