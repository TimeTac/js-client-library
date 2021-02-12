import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { stringify } from 'qs';

import BaseApi from '../baseApi';
import { objectCheck } from '../utils';
import { Credentials, TokenResponse } from './types';

export class AuthenticationEndpoint extends BaseApi {
  public readonly resourceName = '';

  setClientId(clientId: string): void {
    this.config.clientId = clientId;
  }

  setTokens({ accessToken, refreshToken }: { accessToken?: string; refreshToken?: string }) {
    this.config.accessToken = accessToken;
    this.config.refreshToken = refreshToken;
  }

  getTokens(): { accessToken: string | undefined; refreshToken: string | undefined } {
    return {
      accessToken: this.config.accessToken,
      refreshToken: this.config.refreshToken,
    };
  }

  async requestTokens(credentials: Credentials): Promise<AxiosResponse> {
    const url = `${this.getAccountUrl()}auth/oauth2/token`;
    const config = {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    };
    return axios.post<Credentials>(url, stringify(credentials), config);
  }

  async refreshToken(): Promise<AxiosResponse<TokenResponse>> {
    const { refreshToken } = this.getTokens();

    if (this.config.clientId && this.config.clientSecret && refreshToken) {
      const credentials: Credentials = {
        grant_type: 'refresh_token',
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        refresh_token: refreshToken,
      };

      const url = `${this.getAccountUrl()}auth/oauth2/token`;
      const config: AxiosRequestConfig = {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      };

      return axios.post<TokenResponse>(url, stringify(credentials), config);
    }

    throw objectCheck(
      {
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        refresh_token: refreshToken,
      },
      'Missing data for:'
    );
  }

  async login(credentials: Credentials): Promise<{ accessToken: string; refreshToken: string }> {
    this.config.clientId = credentials.client_id || this.config.clientId;
    this.config.clientSecret = credentials.client_secret || this.config.clientSecret;
    const response = await this.requestTokens(credentials);
    const { access_token: accessToken, refresh_token: refreshToken } = response.data;
    this.setTokens({ accessToken, refreshToken });
    return { accessToken, refreshToken };
  }
}
