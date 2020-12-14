import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse } from './utils/response/apiResponse';

const DEFAULT_API_VERSION = 3;
const DEFAULT_HOST = 'go-stage.timetac.com';

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

type onTokenRefreshedCallback = (tokens: Tokens) => void;

export type ApiState = {
  refreshingToken: false | Promise<AxiosResponse<any>>;
};

export type ApiConfig = {
  host?: string;
  version?: number;
  account?: string;
  accessToken?: string;
  refreshToken?: string;
  clientId?: string;
  clientSecret?: string;
  onTokenRefreshedCallback?: onTokenRefreshedCallback;
  autoRefreshToken?: boolean;
};

export default abstract class BaseApi {
  public readonly resourceName: String = '';

  constructor(public config: ApiConfig) {}

  private getOptions(options?: AxiosRequestConfig) {
    return {
      headers: {
        Authorization: `Bearer ${this.config.accessToken}`,
        'Content-type': 'application/json',
      },
      ...options,
    };
  }

  protected _get<T>(endpoint: string, options?: AxiosRequestConfig): Promise<AxiosResponse> {
    const url = this.getApiPath() + endpoint;
    const config = this.getOptions(options);
    return axios.get<ApiResponse<T>>(url, config);
  }

  protected _post<T>(endpoint: string, data?: object, options?: AxiosRequestConfig): Promise<AxiosResponse> {
    const url = this.getApiPath() + endpoint;
    const config = this.getOptions(options);
    return axios.post<ApiResponse<T>>(url, data, config);
  }

  protected _put<T>(endpoint: string, data?: object, options?: AxiosRequestConfig): Promise<AxiosResponse> {
    const url = this.getApiPath() + endpoint;
    const config = this.getOptions(options);
    return axios.put<ApiResponse<T>>(url, data, config);
  }

  protected _delete<T>(endpoint: string, options?: AxiosRequestConfig): Promise<AxiosResponse> {
    const url = this.getApiPath() + endpoint;
    const config = this.getOptions(options);
    return axios.delete<ApiResponse<T>>(url, config);
  }

  protected getApiPath(): string {
    return `${this.getAccountUrl()}userapi/v${this.config.version ?? DEFAULT_API_VERSION}/`;
  }

  protected getAccountUrl(): string {
    return `https://${this.config.host ?? DEFAULT_HOST}/${this.config.account}/`;
  }

  public setAccount(account: string): void {
    this.config.account = account;
  }

  public getResourceName(): String {
    return this.resourceName;
  }

  public getResourcePath(): String {
    return `${this.getApiPath()}${this.getResourceName()}`;
  }
}
