import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { AuthenticationEndpoint } from '../authentication';
import { TokenResponse } from '../authentication/types';
import { ApiState } from '../baseApi';
import { callCanonicalTimeUpdater, updateCanonicalTime } from './canonicalTime';
import { ConfigProvider } from '.';

export type InterceptorParams = {
  state: ApiState;
  config: ConfigProvider;
  authentication: AuthenticationEndpoint;
};

const abortController = new AbortController();

export const cancelAllRequests = () => {
  abortController.abort();
};

const requestInterceptor = (config: AxiosRequestConfig): InternalAxiosRequestConfig<unknown> => {
  // axios.defaults do not automatically apply here, so set timeout manually
  config.signal = abortController.signal;
  config.timeout = axios.defaults.timeout;
  config.headers = config.headers ?? {};
  return config as InternalAxiosRequestConfig<unknown>;
};

const createResponseFulfilledInterceptor = (interceptorParams: InterceptorParams) => (res: AxiosResponse) => {
  updateCanonicalTime(res.data, interceptorParams.config.settings.onServerTimeDeviationChange);
  callCanonicalTimeUpdater(res.data, interceptorParams.config.settings.canonicalTimeUpdater);
  return res;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const MAX_RETRY_AMOUNT = 3;

export const createResponseRejectedInterceptor = (interceptorParams: InterceptorParams) => async (error: AxiosError) => {
  const untouchedRequest = error.config as AxiosRequestConfig & { _shouldRetry: boolean; retryCount: number };

  // Handle network errors and retry with exponential backoff
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition,@typescript-eslint/strict-boolean-expressions
  if (untouchedRequest && !error.response) {
    untouchedRequest.retryCount = untouchedRequest.retryCount || 0;

    if (untouchedRequest.retryCount < MAX_RETRY_AMOUNT) {
      untouchedRequest.retryCount++;
      const delayTime = 1000 * Math.pow(2, untouchedRequest.retryCount - 1);
      await delay(delayTime);

      return axios(untouchedRequest);
    } else {
      throw error;
    }
  }

  // Handle token expiration error
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (interceptorParams.config.settings.shouldAutoRefreshToken && error.response) {
    // Axios transforms the request body to string automatically, parse it back to JSON to avoid sending a string instead of JSON when retrying the request

    if (untouchedRequest.headers?.['Content-Type'] === 'application/json' && typeof untouchedRequest.data === 'string') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      untouchedRequest.data = JSON.parse(untouchedRequest.data);
    }

    /* eslint-disable @typescript-eslint/strict-boolean-expressions */
    if (
      error.response.status === 401 &&
      !untouchedRequest._shouldRetry &&
      !error.response.config.url?.includes('oauth2') &&
      !error.response.config.url?.includes('temporaryTokens')
    ) {
      /* eslint-enable @typescript-eslint/strict-boolean-expressions */

      untouchedRequest._shouldRetry = true;

      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (!interceptorParams.state.refreshingToken) {
        interceptorParams.state.refreshingToken = interceptorParams.authentication.refreshToken();
      }

      let res: AxiosResponse<TokenResponse>;
      try {
        res = await interceptorParams.state.refreshingToken;
      } catch (e) {
        const error = e as AxiosError;
        // Check if refresh token expired, call tokenRefreshFailed() and then re-throw error
        const status = error.response?.status;
        if (status === 497 || status === 404 || status === 503 || status === 400) {
          if (interceptorParams.config.settings.onTokenRefreshFailed != null) {
            cancelAllRequests();
            interceptorParams.config.settings.onTokenRefreshFailed();
          }
        }

        // Make sure we clear that promise, otherwise there won't be any further token requests
        interceptorParams.state.refreshingToken = false;
        throw error;
      }

      interceptorParams.state.refreshingToken = false;

      if (res.status === 200 && res.data.access_token) {
        const { access_token: accessToken, refresh_token: refreshToken } = res.data;
        interceptorParams.authentication.setTokens({ accessToken, refreshToken });

        if (untouchedRequest.headers) {
          untouchedRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        if (interceptorParams.config.settings.onTokenRefreshedCallback) {
          interceptorParams.config.settings.onTokenRefreshedCallback({ accessToken, refreshToken });
        }
        return axios(untouchedRequest);
      }
    }
  }
  throw error;
};

export const useInterceptors = (interceptorParams: InterceptorParams): void => {
  axios.interceptors.request.use(requestInterceptor);
  axios.interceptors.response.use(
    createResponseFulfilledInterceptor(interceptorParams),
    createResponseRejectedInterceptor(interceptorParams),
  );
};

type AxiosDefaultsWithoutHeaders = Omit<AxiosRequestConfig, 'headers'>;

export const setAxiosDefaults = (defaults: AxiosDefaultsWithoutHeaders) => {
  axios.defaults = {
    ...axios.defaults,
    ...defaults,
  };
};

export const testAxiosObject = axios;
