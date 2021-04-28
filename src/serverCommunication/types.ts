export type ServerCommunication = {
  host: string;
  authenticationType: 'AUTHORIZATION_CODE_GRANT' | 'PASSWORD_GRANT';
  force_sso: boolean;
};
