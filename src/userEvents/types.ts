export type UserEvent = {
  id: number;
  event_name: string;
  user_id: number;
  meta_text?: string;
  meta_json?: string;
};

export type UserEventCreate = Omit<UserEvent, 'id'>;
