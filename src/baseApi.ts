import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { TokenResponse } from './authentication/types';
import { ConfigProvider } from './utils';
import { RequestParams } from './utils/params/requestParams';
import { ApiBatchResponse, ApiResponse, Entity, LibraryReturn, ResourceNames } from './utils/response/apiResponse';
import { DeltaSyncResponse } from './utils/response/deltaSyncResponse';
import { createRawApiResponse } from './utils/response/rawApiResponse';
import { createReadRawResponse, ReadRawResponse } from './utils/response/readRawResponse';
import { createResourceResponse } from './utils/response/resourceResponse';
import { RequestPromise, optional, list, requiredSingle, RequestBatchPromise } from './utils/response/responseHandlers';
import { User } from './users/types';
import { DeltaSyncParams } from './utils/params/deltaSyncParams';

const DEFAULT_HOST = 'api.timetac.com';
export const DEFAULT_API_VERSION = 4;

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
  apiPrefix?: string;
  onServerTimeDeviationChange?: (deviation: number) => void;
  canonicalTimeUpdater?: (serverTimeZone: string, serverRequestEndTime: string) => void;
  getChangedOnlyConfig?: (loggedInUser: User, since?: string) => DeltaSyncParams;
  customRequestHeaders?: { [key: string]: string };
};

export default abstract class BaseApi<ResourceName extends ResourceNames> {
  public abstract readonly resourceName: ResourceName;

  constructor(public config: ConfigProvider) {}

  private getOptions(options?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...options,
      headers: {
        Authorization: `Bearer ${this.config.settings.accessToken ?? ''}`,
        'Content-type': 'application/json',
        ...(options?.headers as Record<string, string>),
        ...this.config.settings.customRequestHeaders,
      },
    };
  }

  protected _get<ResourceName extends ResourceNames>(slug: string, options?: AxiosRequestConfig): RequestPromise<ResourceName> {
    const url = `${this.getBaseEndpointUrl()}${slug}`;
    const config = this.getOptions(options);
    return axios.get<ApiResponse<ResourceName>>(url, config);
  }

  protected _getDeltaSync(slug: string, options: AxiosRequestConfig): Promise<AxiosResponse<DeltaSyncResponse>> {
    const url = `${this.getBaseEndpointUrl()}${slug}`;
    const config = this.getOptions(options);
    return axios.get<DeltaSyncResponse>(url, config);
  }

  protected _post<ResourceName extends ResourceNames>(
    slug: string,

    data?: object,
    params?: RequestParams<Entity<ResourceName>>,
    options?: AxiosRequestConfig,
  ): RequestPromise<ResourceName> {
    const url = `${this.getBaseEndpointUrl()}${slug}`;
    const config = this.getOptions(options);
    return axios.post<ApiResponse<ResourceName>>(url, { ...data, ...params }, config);
  }

  protected _postBinary<ResourceName extends ResourceNames>(
    slug: string,
    data?: Blob | string,
    options?: AxiosRequestConfig,
  ): RequestPromise<ResourceName> {
    const url = `${this.getBaseEndpointUrl()}${slug}`;
    const config = this.getOptions(options);
    return axios.post<ApiResponse<ResourceName>>(url, data, config);
  }

  protected _put<ResourceName extends ResourceNames>(
    slug: string,

    data?: object,
    params?: RequestParams<Entity<ResourceName>>,
    options?: AxiosRequestConfig,
  ): RequestPromise<ResourceName> {
    const url = `${this.getBaseEndpointUrl()}${slug}`;
    const config = this.getOptions(options);
    return axios.put<ApiResponse<ResourceName>>(url, { ...data, ...params }, config);
  }

  protected _putBatch<ResourceName extends ResourceNames>(
    slug: string,

    data?: object,
    params?: RequestParams<Entity<ResourceName>>,
    options?: AxiosRequestConfig,
  ): RequestBatchPromise<ResourceName> {
    const url = `${this.getBaseEndpointUrl()}${slug}`;
    const config = this.getOptions(options);
    return axios.put<ApiBatchResponse<ResourceName>>(url, { ...data, ...params }, config);
  }

  protected _postBatch<ResourceName extends ResourceNames>(
    slug: string,

    data?: object,
    params?: RequestParams<Entity<ResourceName>>,
    options?: AxiosRequestConfig,
  ) {
    const url = `${this.getBaseEndpointUrl()}${slug}`;
    const config = this.getOptions(options);
    return axios.post<ApiBatchResponse<ResourceName>>(url, { ...data, ...params }, config);
  }

  protected _delete<ResourceName extends ResourceNames>(slug: string, options?: AxiosRequestConfig): RequestPromise<ResourceName> {
    const url = `${this.getBaseEndpointUrl()}${slug}`;
    const config = this.getOptions(options);
    //Delete requests send no content

    if (config.headers) {
      config.headers['Content-type'] = '';
    }
    return axios.delete<ApiResponse<ResourceName>>(url, config);
  }

  protected getBaseEndpointUrl(): string {
    return `${this.getApiPath()}${this.getResourceName()}/`;
  }

  protected getApiPath(): string {
    return `${this.getAccountUrl()}${this.getApiPrefix()}v${this.config.settings.version ?? DEFAULT_API_VERSION}/`;
  }

  protected getApiPrefix(): string {
    if (this.config.settings.apiPrefix === undefined) {
      return 'userapi/';
    }
    return this.config.settings.apiPrefix.length > 0 ? `${this.config.settings.apiPrefix}` : '';
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
    params?: RequestParams<Entity<ResourceName>>,
  ): Promise<LibraryReturn<ResourceName, Entity<ResourceName> | undefined>> {
    const response = this._get<ResourceName>(`read/${id}`, { params });
    return optional(response);
  }

  public read(params?: RequestParams<Entity<ResourceName>> | string): Promise<LibraryReturn<ResourceName, Entity<ResourceName>[]>> {
    const response = this._get<ResourceName>('read', { params });
    return list(response);
  }

  public delete(id: number): Promise<LibraryReturn<ResourceName>> {
    const response = this._delete<ResourceName>(`delete/${id}`);
    return requiredSingle(response);
  }

  public async readRaw(params: RequestParams<Entity<ResourceName>>): Promise<ReadRawResponse<Entity<ResourceName>>> {
    const response = this._get<ResourceName>('read', { params });
    return createReadRawResponse<Entity<ResourceName>>(createResourceResponse(await createRawApiResponse(response)), params);
  }
}
