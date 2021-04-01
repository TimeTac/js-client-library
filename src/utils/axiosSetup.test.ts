import { AxiosError, AxiosResponse } from 'axios';

import { AuthenticationEndpoint } from '../authentication';
import { TokenResponse } from '../authentication/types';
import { InterceptorParams, responseRejectedInterceptor } from './axiosSetup';

describe('axiosSetup', () => {
  test('interceptor calls onTokenRefreshFailed', async (done) => {
    const mockConfig = {
      autoRefreshToken: true,
      onTokenRefreshFailed: jest.fn(),
      timeout: 100,
      accessToken: 'the access token',
      refreshToken: 'the refresh token',
      account: 'the account',
      clientId: 'the client id',
      clientSecret: 'the client secret',
      host: 'the host',
      https: true,
      onTokenRefreshedCallback: jest.fn(),
      version: 1,
    };

    const mockAuthenticationEndpoint = new AuthenticationEndpoint(mockConfig);

    mockAuthenticationEndpoint.refreshToken = (jest.fn(() =>
      Promise.reject(responseRejectedInterceptor(new Error('Refresh token expired or something'))
    ) as unknown) as () => Promise<AxiosResponse<TokenResponse>>;

    const mockInterceptorParams: InterceptorParams = {
      config: mockConfig,
      state: {
        refreshingToken: false,
      },
      // authentication: {
      //   config: mockedConfig,
      //   getResourceName: jest.fn(),
      //   getResourcePath: jest.fn(),
      //   getTokens: jest.fn(),
      //   login: jest.fn(),
      //   requestTokens: jest.fn(),
      //   refreshToken: jest.fn(),
      //   resourceName: '',
      //   setAccount: jest.fn(),
      //   setClientId: jest.fn(),
      //   setTokens: jest.fn(),
      //   _delete: jest.fn(),
      //   _get: jest.fn(),
      //   _post: jest.fn(),
      //   _put: jest.fn(),
      //   getAccountUrl: jest.fn(),
      //   getApiPath: jest.fn(),
      //   getOptions: jest.fn(),
      // },
      authentication: mockAuthenticationEndpoint,
    };

    const mockError: AxiosError = {
      code: '401',
      response: {
        status: 401,
        config: { url: 'someurl' },
        data: {},
        statusText: '',
        headers: {},
      },
      config: {},
      isAxiosError: true,
      message: 'the error message',
      name: 'the name',
      toJSON: () => ({}),
    };

    const interceptor = responseRejectedInterceptor(mockInterceptorParams);
    await interceptor(mockError).catch((error) => {
      //expect(error).toBeFalsy();
    });

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockAuthenticationEndpoint.refreshToken).toHaveBeenCalledTimes(1);
    expect(mockInterceptorParams.config.onTokenRefreshFailed).toHaveBeenCalledTimes(1);
    done();
  });
});
