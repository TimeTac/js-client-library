export type Message = {
  id: number;
  sender_id?: number;
  message?: string;
  receiver_type?: string;
  receiver_id?: number;
  include_sub_department?: boolean;
  data_changed?: string; // Y-m-d H:i:s
  timestamp_update?: string; // Y-m-d H:i:s
  timestamp?: string; // Y-m-d H:i:s
};

export type MessageCreate = Omit<Message, 'id' | 'data_changed' | 'timestamp_update' | 'timestamp'>;
