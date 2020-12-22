import axios from 'axios';
import { ApiConfig, ApiState } from '../baseApi';
import Authentication from '../authentication';

type interceptorParams = {
  state: ApiState;
  config: ApiConfig;
  authentication: Authentication;
};

const interceptor = (apiInstanceData: interceptorParams) => {
  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error) => {
      if (apiInstanceData.config.autoRefreshToken && error.response) {
        const untouchedRequest = error.config;

        if (error.response.status === 497 && untouchedRequest.url.includes('auth/oauth2/token')) {
          if (apiInstanceData.config.onTokenRefreshedFailed) {
            apiInstanceData.config.onTokenRefreshedFailed();
          }
          return error;
        }

        if (error.response.status === 401 && !untouchedRequest._retry) {
          untouchedRequest._retry = true;

          if (!apiInstanceData.state.refreshingToken) {
            apiInstanceData.state.refreshingToken = apiInstanceData.authentication.refreshToken();
          }
          const res = await apiInstanceData.state.refreshingToken;

          if (res.status === 200 && res.data.access_token) {
            const { access_token: accessToken, refresh_token: refreshToken } = res.data;
            apiInstanceData.authentication.setTokens({ accessToken, refreshToken });
            untouchedRequest.headers.Authorization = `Bearer ${accessToken}`;
            if (apiInstanceData.config.onTokenRefreshedCallback) {
              apiInstanceData.config.onTokenRefreshedCallback({ accessToken, refreshToken });
            }
            return axios(untouchedRequest);
          }
        }
        return Promise.reject(error.response);
      }
      return error.response;
    }
  );
};

export default interceptor;
