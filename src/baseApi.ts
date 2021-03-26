import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { TokenResponse } from './authentication/types';
import { ApiResponse } from './utils/response/apiResponse';
import { RequestPromise } from './utils/response/responseHandlers';

const DEFAULT_HOST = 'go.timetac.com';
const DEFAULT_API_VERSION = 3;

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

type onTokenRefreshedCallback = (tokens: Tokens) => void;

export type ApiState = {
  refreshingToken: false | Promise<AxiosResponse<TokenResponse>>;
};

export type ApiConfig = {
  host?: string;
  https?: boolean;
  version?: number;
  account?: string;
  accessToken?: string;
  refreshToken?: string;
  clientId?: string;
  clientSecret?: string;
  onTokenRefreshedCallback?: onTokenRefreshedCallback;
  onTokenRefreshedFailed?: () => void;
  autoRefreshToken?: boolean;
  timeout?: number;
};

export default abstract class BaseApi {
  public abstract readonly resourceName: string;

  constructor(public config: ApiConfig) {}

  private getOptions(options?: AxiosRequestConfig) {
    return {
      headers: {
        Authorization: `Bearer ${this.config.accessToken ?? ''}`,
        'Content-type': 'application/json',
      },
      ...options,
    };
  }

  protected _get<T>(endpoint: string, options?: AxiosRequestConfig): RequestPromise<T> {
    const url = this.getApiPath() + endpoint;
    const config = this.getOptions(options);
    return axios.get<ApiResponse<T>>(url, config);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  protected _post<T>(endpoint: string, data?: object, options?: AxiosRequestConfig): RequestPromise<T> {
    const url = this.getApiPath() + endpoint;
    const config = this.getOptions(options);
    return axios.post<ApiResponse<T>>(url, data, config);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  protected _put<T>(endpoint: string, data?: object, options?: AxiosRequestConfig): RequestPromise<T> {
    const url = this.getApiPath() + endpoint;
    const config = this.getOptions(options);
    return axios.put<ApiResponse<T>>(url, data, config);
  }

  protected _delete<T>(endpoint: string, options?: AxiosRequestConfig): RequestPromise<T> {
    const url = this.getApiPath() + endpoint;
    const config = this.getOptions(options);
    return axios.delete<ApiResponse<T>>(url, config);
  }

  protected getApiPath(): string {
    return `${this.getAccountUrl()}userapi/v${this.config.version ?? DEFAULT_API_VERSION}/`;
  }

  protected getAccountUrl(): string {
    if (this.config.account == null) {
      throw new Error('Account is not set');
    }

    return `${axios.defaults.baseURL ?? DEFAULT_HOST}/${this.config.account}/`;
  }

  public setAccount(account: string): void {
    this.config.account = account;
  }

  public getResourceName(): string {
    return this.resourceName;
  }

  public getResourcePath(): string {
    return `${this.getApiPath()}${this.getResourceName()}`;
  }
}
