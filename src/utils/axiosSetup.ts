import axios from 'axios';
import { ApiConfig, ApiState } from '../baseApi';
import { AuthenticationEndpoint } from '../authentication';

type interceptorParams = {
  state: ApiState;
  config: ApiConfig;
  authentication: AuthenticationEndpoint;
};

const interceptor = (apiInstanceData: interceptorParams) => {
  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error) => {
      if (apiInstanceData.config.autoRefreshToken) {
        const untouchedRequest = error.config;

        if (error.response.status === 401 && untouchedRequest.url.indexOf('auth/oauth2/token') !== -1) {
          return Promise.reject(error);
        }
        if (error.response.status === 401 && !untouchedRequest._retry) {
          untouchedRequest._retry = true;

          if (!apiInstanceData.state.refreshingToken) {
            apiInstanceData.state.refreshingToken = apiInstanceData.authentication.refreshToken();
          }
          apiInstanceData.state.refreshingToken.then(async (res) => {
            if (res.status === 200) {
              const { access_token: accessToken, refresh_token: refreshToken } = res.data;
              apiInstanceData.authentication.setTokens({ accessToken, refreshToken });
              untouchedRequest.headers.Authorization = `Bearer ${accessToken}`;
              if (apiInstanceData.config.onTokenRefreshedCallback) {
                apiInstanceData.config.onTokenRefreshedCallback({ accessToken, refreshToken });
              }
              return axios(untouchedRequest);
            }
          });
        }
        return Promise.reject(error.response);
      }
      return error.response;
    }
  );
};

export default interceptor;
