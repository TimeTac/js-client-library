import { AxiosError } from 'axios';

import { AuthenticationEndpoint } from '../authentication';
import { ConfigProvider } from '.';
import { createResponseRejectedInterceptor, InterceptorParams } from './axiosSetup';

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

    const mockAuthenticationEndpoint = new AuthenticationEndpoint(new ConfigProvider(mockConfig));

    const mockInterceptorParams: InterceptorParams = {
      config: new ConfigProvider(mockConfig),
      state: {
        refreshingToken: false,
      },
      authentication: mockAuthenticationEndpoint,
    };

    const mockErrorUnauthenticated: AxiosError = {
      code: '401',
      response: {
        status: 401,
        config: { url: 'someurl' },
        data: {
          error_description: 'The provided access token is expired.',
          error: 'unauthorized_client',
        },
        statusText: '',
        headers: {},
      },
      config: {},
      isAxiosError: true,
      message: 'unauthorized',
      name: 'the name',
      toJSON: () => ({}),
    };

    const mockErrorRefreshFailed: AxiosError = {
      code: '497',
      response: {
        status: 497,
        config: { url: 'someurl' },
        data: {
          error_description: 'The provided refresh token is invalid.',
          error: 'invalid_grant',
        },
        statusText: '',
        headers: {},
      },
      config: {},
      isAxiosError: true,
      message: 'refresh token request failed',
      name: 'the name',
      toJSON: () => ({}),
    };

    const interceptor = createResponseRejectedInterceptor(mockInterceptorParams);

    // The token refresh goes through the interceptor too, so we emulate that here
    mockAuthenticationEndpoint.refreshToken = jest.fn(() => interceptor(mockErrorRefreshFailed));

    expect.assertions(3);

    await interceptor(mockErrorUnauthenticated).catch((error) => {
      expect(error).toMatchObject({ message: 'refresh token request failed' });
    });

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockAuthenticationEndpoint.refreshToken).toHaveBeenCalledTimes(1);
    expect(mockInterceptorParams.config.settings.onTokenRefreshFailed).toHaveBeenCalledTimes(1);
    done();
  });
});
