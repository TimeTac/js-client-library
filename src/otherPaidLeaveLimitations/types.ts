export type OtherPaidLeaveLimitation = {
  id: number;
  absence_type_id: number;
  absence_subtype_id: number;
  user_id: number;
  cycle_id: number;
  cycle_max_days: number;
};

export type OtherPaidLeaveLimitationCreate = {
  absence_type_id: number;
  absence_subtype_id: number;
  user_id: number;
  cycle_id: number;
  cycle_max_days: number;
};

export type OtherPaidLeaveLimitationUpdate = Partial<OtherPaidLeaveLimitation> & {
  id: number;
};
