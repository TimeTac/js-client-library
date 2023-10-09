export type SsoConfig = {
  id?: number;
  entity_id: string;
  login_url: string;
  logout_url: string;
  open_id_login: 'O' | 'R';
  x509_certificate?: string;
  send_email_reminders: boolean;
};

export type SsoConfigUpdate = {
  id: number;
  open_id_login: '0';
  x509_certificate: string;
  send_email_reminders: boolean;
};
