export type UserHistoryEntry = {
  id: number;
  user_id: number;
  change_user_id: number;
  change_date: string;
  change_type: string;
  old_value?: string;
  new_value?: string;
};
