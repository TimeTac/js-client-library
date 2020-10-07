import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse } from './utils/apiResponse';

const DEFAULT_API_VERSION = 3;
const DEFAULT_HOST = 'go.timetac.com';

export type ApiConfig = {
  host?: string;
  version?: number;
  account?: string;
  accessToken?: string;
  refreshToken?: string;
};

export default abstract class BaseApi {
  private readonly basePath: string;

  constructor(public config: ApiConfig) {
    this.basePath = this.getApiPath();
  }

  protected get<T>(endpoint: string, options?: AxiosRequestConfig): Promise<AxiosResponse> {
    const url = this.basePath + endpoint;
    const config = this.getOptions(options);
    return axios.get<ApiResponse<T>>(url, config);
  }

  protected post<T>(endpoint: string, data?: object, options?: AxiosRequestConfig): Promise<AxiosResponse> {
    const url = this.basePath + endpoint;
    const config = this.getOptions(options);
    return axios.post<ApiResponse<T>>(url, data, config);
  }

  getOptions(options?: AxiosRequestConfig) {
    return {
      headers: {
        Authorization: `Bearer ${this.config.accessToken}`,
        'Content-type': 'application/json',
      },
      ...options,
    };
  }

  protected getApiPath(): string {
    return `${this.getAccountUrl()}userapi/v${this.config.version ?? DEFAULT_API_VERSION}/`;
  }

  protected getAccountUrl(): string {
    return `https://${this.config.host ?? DEFAULT_HOST}/${this.config.account}/`;
  }

  protected setAccount(account: string): void {
    this.config.account = account;
  }
}
