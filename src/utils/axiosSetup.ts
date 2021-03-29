import axios, { AxiosRequestConfig } from 'axios';

import { AuthenticationEndpoint } from '../authentication';
import { ApiConfig, ApiState } from '../baseApi';

type interceptorParams = {
  state: ApiState;
  config: ApiConfig;
  authentication: AuthenticationEndpoint;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const interceptor = (apiInstanceData: interceptorParams) => {
  axios.interceptors.request.use((config) => {
    config.timeout = axios.defaults.timeout;
    // TODO: Investigate why axios.defaults do not automatically apply here
    return config;
  });

  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error) => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions,@typescript-eslint/no-unsafe-member-access
      if (apiInstanceData.config.autoRefreshToken && error.response) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        const untouchedRequest = error.config;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call,@typescript-eslint/strict-boolean-expressions
        if (error.response.status === 497 && untouchedRequest.url.includes('auth/oauth2/token')) {
          if (apiInstanceData.config.onTokenRefreshedFailed) {
            apiInstanceData.config.onTokenRefreshedFailed();
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
            if (apiInstanceData.config.onTokenRefreshedCallback) {
              apiInstanceData.config.onTokenRefreshedCallback({ accessToken, refreshToken });
            }
            return axios(untouchedRequest);
          } else if (apiInstanceData.config.onTokenRefreshedFailed) {
            apiInstanceData.config.onTokenRefreshedFailed();
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
