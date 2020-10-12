export type Credentials =
  | {
      grant_type: 'refresh_token';
      client_id: string;
      client_secret: string;
      refresh_token: string;
    }
  | {
      grant_type: 'password';
      client_id: string;
      client_secret: string;
      username: string;
      password: string;
    };
