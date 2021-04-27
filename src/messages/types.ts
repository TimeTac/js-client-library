export type Message = {
  id: number;
  sender_id: number;
  message: string;
  receiver_type: string | null;
  receiver_id: number | null;
  include_sub_department: boolean | null;
  data_changed: string; // Y-m-d H:i:s
  timestamp_update: string; // Y-m-d H:i:s
  timestamp: string; // Y-m-d H:i:s
};

export type MessageCreate = Omit<Partial<Message>, 'id' | 'data_changed' | 'timestamp_update'> & {
  sender_id: number;
  message: string;
};

export type MessageUpdate = Omit<Partial<Message>, 'data_changed' | 'timestamp_update'> & {
  id: number;
};
