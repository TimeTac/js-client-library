import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { AuthenticationEndpoint } from '../authentication';
import { TokenResponse } from '../authentication/types';
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

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/strict-boolean-expressions
    if (error.response.status === 401 && !untouchedRequest._retry && !error.response.config.url?.includes('oauth2')) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      untouchedRequest._retry = true;

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
          if (interceptorParams.config.onTokenRefreshFailed != null) {
            interceptorParams.config.onTokenRefreshFailed();
          }
        }
        throw error;
      }

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
