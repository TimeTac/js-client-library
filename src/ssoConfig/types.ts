export type SsoConfig = {
  id: number;
  entity_id: string;
  login_url: string;
  logout_url: string;
  x509_certificate?: string;
  open_id_login: 'O' | 'R';
  send_email_reminders: boolean;
};

export type SsoConfigUpdate = {
  id: number;
  entity_id?: string;
  login_url?: string;
  logout_url?: string;
  x509_certificate?: string;
  open_id_login?: 'O' | 'R';
  send_email_reminders?: boolean;
};

export type SsoConfigCreate = Omit<SsoConfig, 'id'>;
