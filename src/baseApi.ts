import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { TokenResponse } from './authentication/types';
import { ConfigProvider } from './utils';
import { RequestParams } from './utils/params/requestParams';
import { ApiResponse, Entity, LibraryReturn, ResourceNames, Resources } from './utils/response/apiResponse';
import { DeltaSyncResponse } from './utils/response/deltaSyncResponse';
import { createRawApiResponse } from './utils/response/rawApiResponse';
import { createReadRawResponse, ReadRawResponse } from './utils/response/readRawResponse';
import { createResourceResponse } from './utils/response/resourceResponse';
import { RequestPromise, optional, list, requiredSingle } from './utils/response/responseHandlers';

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
  onTokenRefreshFailed?: () => void;
  shouldAutoRefreshToken?: boolean;
  timeout?: number;
  onServerTimeDeviationChange?: (deviation: number) => void;
};

export default abstract class BaseApi<ResourceName extends ResourceNames> {
  public abstract readonly resourceName: ResourceName;

  constructor(public config: ConfigProvider) {}

  private getOptions(options?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      headers: {
        Authorization: `Bearer ${this.config.settings.accessToken ?? ''}`,
        'Content-type': 'application/json',
      },
      ...options,
    };
  }

  protected _get<ResourceName extends ResourceNames>(
    slug: string,
    options?: AxiosRequestConfig
  ): RequestPromise<ResourceName, Resources[ResourceName]> {
    const url = `${this.getBaseEndpointUrl()}${slug}`;
    const config = this.getOptions(options);
    return axios.get<ApiResponse<ResourceName, Resources[ResourceName][]>>(url, config);
  }

  protected _getDeltaSync(slug: string, options: AxiosRequestConfig): Promise<AxiosResponse<DeltaSyncResponse>> {
    const url = `${this.getBaseEndpointUrl()}${slug}`;
    const config = this.getOptions(options);
    return axios.get<DeltaSyncResponse>(url, config);
  }

  protected _post<ResourceName extends ResourceNames>(
    slug: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    data?: object,
    options?: AxiosRequestConfig
  ): RequestPromise<ResourceName, Resources[ResourceName]> {
    const url = `${this.getBaseEndpointUrl()}${slug}`;
    const config = this.getOptions(options);
    return axios.post<ApiResponse<ResourceName, Resources[ResourceName][]>>(url, data, config);
  }

  protected _put<ResourceName extends ResourceNames>(
    slug: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    data?: object,
    options?: AxiosRequestConfig
  ): RequestPromise<ResourceName, Resources[ResourceName]> {
    const url = `${this.getBaseEndpointUrl()}${slug}`;
    const config = this.getOptions(options);
    return axios.put<ApiResponse<ResourceName, Resources[ResourceName][]>>(url, data, config);
  }

  protected _delete<ResourceName extends ResourceNames>(
    slug: string,
    options?: AxiosRequestConfig
  ): RequestPromise<ResourceName, Resources[ResourceName]> {
    const url = `${this.getBaseEndpointUrl()}${slug}`;
    const config = this.getOptions(options);
    //Delete requests send no content
    // eslint-disable-next-line
    config.headers['Content-type'] = '';
    return axios.delete<ApiResponse<ResourceName, Resources[ResourceName][]>>(url, config);
  }

  protected getBaseEndpointUrl(): string {
    return `${this.getApiPath()}${this.getResourceName()}/`;
  }

  protected getApiPath(): string {
    return `${this.getAccountUrl()}userapi/v${this.config.settings.version ?? DEFAULT_API_VERSION}/`;
  }

  protected getAccountUrl(): string {
    if (this.config.settings.account == null) {
      throw new Error('Account is not set');
    }

    return `${axios.defaults.baseURL ?? DEFAULT_HOST}/${this.config.settings.account}/`;
  }

  public setAccount(account: string): void {
    this.config.settings.account = account;
  }

  public getResourceName(): ResourceName {
    return this.resourceName;
  }

  public getResourcePath(): string {
    return `${this.getApiPath()}${this.getResourceName()}`;
  }

  public readById(
    id: number,
    params?: RequestParams<Entity<ResourceName>>
  ): Promise<LibraryReturn<ResourceName, Entity<ResourceName> | undefined>> {
    const response = this._get<ResourceName>(`read/${id}`, { params });
    return optional(response);
  }

  public read(params?: RequestParams<Entity<ResourceName>> | string): Promise<LibraryReturn<ResourceName, Entity<ResourceName>[]>> {
    const response = this._get<ResourceName>('read', { params });
    return list(response);
  }

  public delete(id: number): Promise<LibraryReturn<ResourceName, Resources[ResourceName]>> {
    const response = this._delete<ResourceName>(`delete/${id}`);
    return requiredSingle(response);
  }

  public async readRaw(params: RequestParams<Entity<ResourceName>>): Promise<ReadRawResponse<Entity<ResourceName>>> {
    const response = this._get<ResourceName>('read', { params });
    return createReadRawResponse<Entity<ResourceName>>(createResourceResponse(await createRawApiResponse(response)), params);
  }
}
