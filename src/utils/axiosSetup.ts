import axios, { AxiosRequestConfig } from 'axios';

import { AuthenticationEndpoint } from '../authentication';
import { ApiState } from '../baseApi';
import { ConfigProvider } from '.';

type interceptorParams = {
  state: ApiState;
  config: ConfigProvider;
  authentication: AuthenticationEndpoint;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const interceptor = (apiInstanceData: interceptorParams) => {
  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error) => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions,@typescript-eslint/no-unsafe-member-access
      if (apiInstanceData.config.settings.autoRefreshToken && error.response) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        const untouchedRequest = error.config;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call,@typescript-eslint/strict-boolean-expressions
        if (error.response.status === 497 && untouchedRequest.url.includes('auth/oauth2/token')) {
          if (apiInstanceData.config.settings.onTokenRefreshedFailed) {
            apiInstanceData.config.settings.onTokenRefreshedFailed();
          }
          throw error;
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/strict-boolean-expressions
        if (error.response.status === 401 && !untouchedRequest._retry) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          untouchedRequest._retry = true;

          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          if (!apiInstanceData.state.refreshingToken) {
            apiInstanceData.state.refreshingToken = apiInstanceData.authentication.refreshToken();
          }

          const res = await apiInstanceData.state.refreshingToken;
          apiInstanceData.state.refreshingToken = false;

          if (res.status === 200 && res.data.access_token) {
            const { access_token: accessToken, refresh_token: refreshToken } = res.data;
            apiInstanceData.authentication.setTokens({ accessToken, refreshToken });
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            untouchedRequest.headers.Authorization = `Bearer ${accessToken}`;
            if (apiInstanceData.config.settings.onTokenRefreshedCallback) {
              apiInstanceData.config.settings.onTokenRefreshedCallback({ accessToken, refreshToken });
            }
            return axios(untouchedRequest);
          } else if (apiInstanceData.config.settings.onTokenRefreshedFailed) {
            apiInstanceData.config.settings.onTokenRefreshedFailed();
          }
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/strict-boolean-expressions
      throw error.response || error;
    }
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const setAxiosDefaults = (defaults: AxiosRequestConfig) => {
  axios.defaults = {
    ...axios.defaults,
    ...defaults,
  };
};

export const testAxiosObject = axios;
