import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { AuthenticationEndpoint } from '../authentication';
import { ApiConfig, ApiState } from '../baseApi';

export type InterceptorParams = {
  state: ApiState;
  config: ApiConfig;
  authentication: AuthenticationEndpoint;
};

const requestInterceptor = (config: AxiosRequestConfig) => {
  // TODO: Investigate why axios.defaults do not automatically apply here
  config.timeout = axios.defaults.timeout;
  return config;
};

const responseFulfilledInterceptor = (res: AxiosResponse) => res;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const responseRejectedInterceptor = (interceptorParams: InterceptorParams) => async (error: AxiosError) => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions,@typescript-eslint/no-unsafe-member-access
  if (interceptorParams.config.autoRefreshToken && error.response) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const untouchedRequest = error.config as AxiosRequestConfig & { _retry: boolean };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call,@typescript-eslint/strict-boolean-expressions
    if (error.response.status === 497 && untouchedRequest.url?.includes('auth/oauth2/token')) {
      if (interceptorParams.config.onTokenRefreshFailed) {
        interceptorParams.config.onTokenRefreshFailed();
      }
      throw {
        statusCode: error.response.status,
        message: error.response.statusText,
        raw: error,
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/strict-boolean-expressions
    if (error.response.status === 401 && !untouchedRequest._retry && !error.response.config.url?.includes('oauth2')) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      untouchedRequest._retry = true;

      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (!interceptorParams.state.refreshingToken) {
        interceptorParams.state.refreshingToken = interceptorParams.authentication.refreshToken();
      }

      const res = await interceptorParams.state.refreshingToken;
      interceptorParams.state.refreshingToken = false;

      if (res.status === 200 && res.data.access_token) {
        const { access_token: accessToken, refresh_token: refreshToken } = res.data;
        interceptorParams.authentication.setTokens({ accessToken, refreshToken });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        untouchedRequest.headers.Authorization = `Bearer ${accessToken}`;
        if (interceptorParams.config.onTokenRefreshedCallback) {
          interceptorParams.config.onTokenRefreshedCallback({ accessToken, refreshToken });
        }
        return axios(untouchedRequest);
      } else if (interceptorParams.config.onTokenRefreshFailed) {
        interceptorParams.config.onTokenRefreshFailed();
      }
    }
  }

  throw {
    statusCode: undefined,
    message: error.message,
    raw: error,
  };
};

export const interceptor = (interceptorParams: InterceptorParams): void => {
  axios.interceptors.request.use(requestInterceptor);
  axios.interceptors.response.use(responseFulfilledInterceptor, responseRejectedInterceptor(interceptorParams));
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const setAxiosDefaults = (defaults: AxiosRequestConfig) => {
  axios.defaults = {
    ...axios.defaults,
    ...defaults,
  };
};
