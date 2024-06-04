import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import BaseApi from '../baseApi';
import { objectCheck } from '../utils';
import { Credentials, TokenResponse } from './types';

export class AuthenticationEndpoint extends BaseApi<any> {
  public resourceName = '';

  setClientId(clientId: string): void {
    this.config.settings.clientId = clientId;
  }

  setTokens({ accessToken, refreshToken }: { accessToken?: string; refreshToken?: string }) {
    this.config.setFields({
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  }

  getTokens(): { accessToken: string | undefined; refreshToken: string | undefined } {
    return {
      accessToken: this.config.settings.accessToken,
      refreshToken: this.config.settings.refreshToken,
    };
  }

  async requestTokens(credentials: Credentials): Promise<AxiosResponse> {
    const url = `${this.getAccountUrl()}auth/oauth2/token`;
    const config = {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        ...this.config.settings.customRequestHeaders,
      },
    };
    return axios.post<Credentials>(url, new URLSearchParams(credentials), config);
  }

  async refreshToken(): Promise<AxiosResponse<TokenResponse>> {
    const { refreshToken } = this.getTokens();

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (this.config.settings.clientId && this.config.settings.clientSecret && refreshToken) {
      const credentials: Credentials = {
        grant_type: 'refresh_token',
        client_id: this.config.settings.clientId,
        client_secret: this.config.settings.clientSecret,
        refresh_token: refreshToken,
      };

      const url = `${this.getAccountUrl()}auth/oauth2/token`;
      const config: AxiosRequestConfig = {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          ...this.config.settings.customRequestHeaders,
        },
      };

      return axios.post<TokenResponse>(url, new URLSearchParams(credentials), config);
    }

    throw objectCheck(
      {
        client_id: this.config.settings.clientId,
        client_secret: this.config.settings.clientSecret,
        refresh_token: refreshToken,
      },
      'Missing data for:',
    );
  }

  async login(credentials: Credentials): Promise<{ accessToken: string; refreshToken: string }> {
    this.config.settings.clientId = credentials.client_id || this.config.settings.clientId;

    this.config.settings.clientSecret = credentials.client_secret ?? this.config.settings.clientSecret;
    const response = await this.requestTokens(credentials);

    const { access_token: accessToken, refresh_token: refreshToken } = response.data;

    this.setTokens({ accessToken, refreshToken });

    return { accessToken, refreshToken };
  }
}
