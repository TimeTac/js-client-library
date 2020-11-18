import { AxiosRequestConfig } from 'axios';
import { ApiResponse } from '../../utils/response/apiResponse';

export type MockResponse<T> = [number, ApiResponse<T>];
export type MockReplyFunc<T> = (request: AxiosRequestConfig) => MockResponse<T[]>;

export function assertAndReply<T>(expectedRequest: any, reply: T | MockResponse<T[]>): MockReplyFunc<T> {
  return (request: AxiosRequestConfig) => {
    const actual = request.params ?? (request.data && JSON.parse(request.data));
    expect(actual).toStrictEqual(expectedRequest);

    // If response given return it as-is, otherwise wrap given object in successful response
    if (isMockResponse(reply)) {
      return reply;
    } else {
      const results = Array.isArray(reply) ? reply : [reply];
      return [
        200,
        {
          Success: true,
          NumResults: results.length,
          RequestStartTime: '01-01-2020 00:00:00',
          Results: results,
        },
      ];
    }
  };
}

// Type guard is implemented to enable assertAndReply to automatically check whether the argument is already a response
export function isMockResponse<T>(response: any): response is MockResponse<T> {
  if (response.length !== 2) return false;
  const responseBody = response[1];

  return (
    Number.isInteger(response[0]) &&
    responseBody.hasOwnProperty('Success') &&
    ((responseBody.Success && responseBody.hasOwnProperty('NumResults') && responseBody.hasOwnProperty('Results')) ||
      (!responseBody.Success && responseBody.hasOwnProperty('ErrorMessage')))
  );
}
