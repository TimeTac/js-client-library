import { AxiosRequestConfig } from 'axios';
import { isMockResponse, MockResponse, successfulResponse } from './mockResponse';

export type MockReplyFunc<T> = (request: AxiosRequestConfig) => MockResponse<T[]>;

export function replyIfExpected<T>(expectedRequest: any, reply: T | MockResponse<T[]>): MockReplyFunc<T> {
  return (request: AxiosRequestConfig) => {
    expect(request.params).toStrictEqual(expectedRequest);
    return isMockResponse(reply) ? reply : successfulResponse(reply);
  };
}
