import axios, { AxiosResponse } from 'axios';
import { stringify } from 'qs';
import BaseApi from '../baseApi';
import { Credentials } from './types';

export default class Authentication extends BaseApi {
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

  async login(credentials: Credentials): Promise<{ accessToken: string; refreshToken: string }> {
    const response = await this.requestTokens(credentials);
    const { access_token: accessToken, refresh_token: refreshToken } = response.data;
    this.setTokens({ accessToken, refreshToken });
    return { accessToken, refreshToken };
  }
}
