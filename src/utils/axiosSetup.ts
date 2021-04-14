import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { AuthenticationEndpoint } from '../authentication';
import { TokenResponse } from '../authentication/types';
import { ApiState } from '../baseApi';
import { ErrorFormat } from '../errors';
import { ConfigProvider } from '.';

export type InterceptorParams = {
  state: ApiState;
  config: ConfigProvider;
  authentication: AuthenticationEndpoint;
};

const requestInterceptor = (config: AxiosRequestConfig) => {
  // axios.defaults do not automatically apply here, so set timeout manually
  config.timeout = axios.defaults.timeout;
  return config;
};

const responseFulfilledInterceptor = (res: AxiosResponse) => res;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createResponseRejectedInterceptor = (interceptorParams: InterceptorParams) => async (error: AxiosError) => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions,@typescript-eslint/no-unsafe-member-access
  if (interceptorParams.config.settings.shouldAutoRefreshToken && error.response) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const untouchedRequest = error.config as AxiosRequestConfig & { _shouldRetry: boolean };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/strict-boolean-expressions
    if (error.response.status === 401 && !untouchedRequest._shouldRetry && !error.response.config.url?.includes('oauth2')) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      untouchedRequest._shouldRetry = true;

      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (!interceptorParams.state.refreshingToken) {
        interceptorParams.state.refreshingToken = interceptorParams.authentication.refreshToken();
      }

      let res: AxiosResponse<TokenResponse>;
      try {
        res = await interceptorParams.state.refreshingToken;
      } catch (error: unknown) {
        // Check if refresh token expired, call tokenRefreshFailed() and then re-throw error
        const status = (error as { raw?: { response?: { status?: number } } }).raw?.response?.status;
        if (status === 497) {
          if (interceptorParams.config.settings.onTokenRefreshFailed != null) {
            interceptorParams.config.settings.onTokenRefreshFailed();
          }
        }
        const errorAsAxiosError = error as { code?: number; message?: string };

        const toThrow: ErrorFormat = {
          statusCode: errorAsAxiosError.code,
          message: errorAsAxiosError.message,
          raw: error,
        };

        throw toThrow;
      }

      interceptorParams.state.refreshingToken = false;

      if (res.status === 200 && res.data.access_token) {
        const { access_token: accessToken, refresh_token: refreshToken } = res.data;
        interceptorParams.authentication.setTokens({ accessToken, refreshToken });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        untouchedRequest.headers.Authorization = `Bearer ${accessToken}`;
        if (interceptorParams.config.settings.onTokenRefreshedCallback) {
          interceptorParams.config.settings.onTokenRefreshedCallback({ accessToken, refreshToken });
        }
        return axios(untouchedRequest);
      }
    }
  }

  let toThrow: ErrorFormat;
  if (error.code != null && error.code.length > 0) {
    // if (isNaN(+error.code)) {
    //   throw new Error('error.code not an integer: ' + JSON.stringify(error));
    // }

    toThrow = {
      statusCode: parseInt(error.code),
      message: error.message,
      raw: error,
    };
  } else {
    toThrow = {
      statusCode: undefined,
      message: error.message,
      raw: error,
    };
  }

  throw toThrow;
};

export const useInterceptors = (interceptorParams: InterceptorParams): void => {
  axios.interceptors.request.use(requestInterceptor);
  axios.interceptors.response.use(responseFulfilledInterceptor, createResponseRejectedInterceptor(interceptorParams));
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const setAxiosDefaults = (defaults: AxiosRequestConfig) => {
  axios.defaults = {
    ...axios.defaults,
    ...defaults,
  };
};
