export type Notification = {
  id: number;
  user_id: number;
  notification_type: number;
  is_response: boolean;
  notification_timestamp: string;
  status: number;
  assoc_id: number;
  user_id_sender: number;
  user_id_responder: number;
  processed: boolean;
  email_send_status: number;
  email_send_timestamp: string;
  executable_1_id: number;
  executable_2_id: number;
  data_changed: string;
  inherited_user_ids: string;
};

export type NotificationUpdate = {
  id: number;
  processed: boolean;
};
