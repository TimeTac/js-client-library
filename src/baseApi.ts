import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { TokenResponse } from './authentication/types';
import { ConfigProvider } from './utils';
import { RequestParams } from './utils/params/requestParams';
import { ApiResponse, LibraryReturn, ResourceNames, Resources } from './utils/response/apiResponse';
import { DeltaSyncResponse } from './utils/response/deltaSyncResponse';
import { createRawApiResponse } from './utils/response/rawApiResponse';
import { createReadRawResponse, ReadRawResponse } from './utils/response/readRawResponse';
import { createResourceResponse } from './utils/response/resourceResponse';
import { RequestPromise, optional, list, required } from './utils/response/responseHandlers';

const DEFAULT_HOST = 'gox.timetac.com';
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
  //Promise<AxiosResponse<ApiResponse<ResourceName, Resources[ResourceName][]>>>
  //Promise<AxiosResponse<ApiResponse<T, Resources[T][]>>>
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

  // eslint-disable-next-line @typescript-eslint/ban-types
  protected _post<ResourceName extends ResourceNames>(slug: string, data?: object, options?: AxiosRequestConfig): RequestPromise<ResourceName> {
    const url = `${this.getBaseEndpointUrl()}${slug}`;
    const config = this.getOptions(options);
    return axios.post<ApiResponse<ResourceName>>(url, data, config);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  protected _put<ResourceName extends ResourceNames>(slug: string, data?: object, options?: AxiosRequestConfig): RequestPromise<ResourceName> {
    const url = `${this.getBaseEndpointUrl()}${slug}`;
    const config = this.getOptions(options);
    return axios.put<ApiResponse<ResourceName>>(url, data, config);
  }

  protected _delete<ResourceName extends ResourceNames>(slug: string, options?: AxiosRequestConfig): RequestPromise<ResourceName> {
    const url = `${this.getBaseEndpointUrl()}${slug}`;
    const config = this.getOptions(options);
    //Delete requests send no content
    // eslint-disable-next-line
    config.headers['Content-type'] = '';
    return axios.delete<ApiResponse<ResourceName>>(url, config);
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

  public readById(id: number, params?: RequestParams<Resources[ResourceName]>): Promise<LibraryReturn<ResourceName, Resources[ResourceName] | never[]>> {
    const response = this._get<ResourceName>(`read/${id}`, { params });
    return optional(response);
  }

  public read(params?: RequestParams<Resources[ResourceName]> | string): Promise<LibraryReturn<ResourceName, Resources[ResourceName][]>> {
    const response = this._get<ResourceName>('read', { params });
    return list(response);
  }

  public delete(id: number): Promise<LibraryReturn<ResourceName, Resources[ResourceName][]>> {
    const response = this._delete<ResourceName>(`delete/${id}`);
    return required(response);
  }

  public async readRaw(params: RequestParams<Resources[ResourceName]>): Promise<ReadRawResponse<Resources[ResourceName]>> {
    const response = this._get<ResourceName>('read', { params });
    return createReadRawResponse<Resources[ResourceName]>(createResourceResponse(await createRawApiResponse(response)), params);
  }
}
