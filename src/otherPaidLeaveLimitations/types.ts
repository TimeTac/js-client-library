export type OtherPaidLeaveLimitation = {
  id: number;
  absence_type_id: number;
  absence_subtype_id: number;
  user_id: number;
  cycle_id: number;
  cycle_max_days: number;
};

export type OtherPaidLeaveLimitationCreate = Omit<Partial<OtherPaidLeaveLimitation>, 'id'> & {
  absence_type_id: number;
  absence_subtype_id: number;
  user_id: number;
  cycle_id: number;
  cycle_max_days: number;
};

export type OtherPaidLeaveLimitationUpdate = Omit<Partial<OtherPaidLeaveLimitation>, never> & {
  id: number;
};
