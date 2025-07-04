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
    }
  | {
      grant_type: 'authorization_code';
      client_id: string;
      client_secret?: string;
      code: string;
      code_verifier: string;
      redirect_uri: string;
    };

export type LinkLoginParams = {
  user: string;
  expires: string;
  hash: string;
};

export type LinkLoginBody = {
  client_id: string;
  client_secret: string;
  scope: 'IMPERSONATOR';
};
export type TokenResponse = {
  access_token: string;
  refresh_token: string;
};
