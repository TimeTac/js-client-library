import { expect } from '@jest/globals';
import axios, { AxiosError, AxiosRequestHeaders } from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { AuthenticationEndpoint } from '../authentication';
import { ApiConfig } from '../baseApi';
import Api from '../';
import { createResponseRejectedInterceptor, InterceptorParams } from './axiosSetup';
import { ConfigProvider } from '.';

const mockConfig: ApiConfig = {
  shouldAutoRefreshToken: true,
  onTokenRefreshFailed: jest.fn(),
  timeout: 30000,
  accessToken: 'the access token',
  refreshToken: 'the refresh token',
  account: 'test_account',
  clientId: 'the client id',
  clientSecret: 'the client secret',
  host: 'test_host',
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

describe('axiosSetup', () => {
  test('interceptor calls onTokenRefreshFailed', async () => {
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
    } as unknown as AxiosError;

    const mockErrorRefreshFailed: AxiosError = {
      config: {
        headers: {} as AxiosRequestHeaders,
      },
      request: {},
      response: {
        data: { error_description: 'The provided refresh token is invalid.', error: 'invalid_grant' },
        status: 497,
        statusText: 'unknown status',
        headers: {},
        config: {
          headers: {} as AxiosRequestHeaders,
        },
        request: {},
      },
      isAxiosError: true,
      message: 'Request failed with status code 497',
      name: 'Error',
      toJSON: () => ({ toJSON: 'toJSON' }),
    };

    const interceptor = createResponseRejectedInterceptor(mockInterceptorParams);

    // The token refresh goes through the interceptor too, so we emulate that here
    mockAuthenticationEndpoint.refreshToken = jest.fn(() => interceptor(mockErrorRefreshFailed));

    expect.assertions(3);

    await interceptor(mockErrorUnauthenticated).catch((error) => {
      expect(error).toMatchObject({ message: 'Request failed with status code 497', response: { status: 497 } });
    });

    expect(mockAuthenticationEndpoint.refreshToken).toHaveBeenCalledTimes(1);
    expect(mockInterceptorParams.config.settings.onTokenRefreshFailed).toHaveBeenCalledTimes(1);
  });

  test('interceptor throws error without status code', async () => {
    const mockErrorUnauthenticated: AxiosError = {
      message: 'Request failed with status code 504',
    } as unknown as AxiosError;

    const interceptor = createResponseRejectedInterceptor(mockInterceptorParams);

    await interceptor(mockErrorUnauthenticated).catch((error) => {
      expect(error).toMatchObject({ message: 'Request failed with status code 504' });
    });

    expect.assertions(1);
  });
  test('interceptor gets error with status code typed as string', async () => {
    const mockErrorUnauthenticated: AxiosError = {
      code: '500',
      message: 'Request failed with status code 500',
    } as unknown as AxiosError;

    const interceptor = createResponseRejectedInterceptor(mockInterceptorParams);

    await interceptor(mockErrorUnauthenticated).catch((error) => {
      expect(error).toMatchObject({ code: '500', message: 'Request failed with status code 500' });
    });

    expect.assertions(1);
  });
  test('error handling on network timeout', async () => {
    try {
      const mock = new AxiosMockAdapter(axios);
      const api = new Api(mockConfig);
      const readPath = `${api.tasks.getResourcePath()}/read`;
      mock.onGet(readPath).timeout();
      await api.tasks.read();
    } catch (error) {
      expect(error).toMatchObject({ message: 'timeout of 30000ms exceeded' });
    }

    expect.assertions(1);
  });
});
