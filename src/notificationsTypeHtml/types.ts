export type NotificationTypeHtml = {
  id: number;
  created: string;
  status: boolean;
  title: string;
  email_subject: string;
  email_footer: string;
  content: string;
  recipient: number;
  sender: number;
  content_css_class: string;
  content_css_styles: string;
  send_mail_per_email_notification_manager: boolean;
  data_changed: string;
};
