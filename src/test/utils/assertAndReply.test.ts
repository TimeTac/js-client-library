import { MockReplyFunc, assertAndReply, MockResponse } from './assertAndReply';
import { AxiosRequestConfig } from 'axios';

describe('replyIf', () => {
  test('When called with object, return successful response', () => {
    const func: MockReplyFunc<{ a: number }> = assertAndReply({ b: 2 }, { a: 1 });

    const actualRequest: AxiosRequestConfig = { params: { b: 2 } };
    const expectedResponse: MockResponse<[{ a: 1 }]> = [
      200,
      { Success: true, NumResults: 1, Results: [{ a: 1 }], RequestStartTime: '01-01-2020 00:00:00' },
    ];

    expect(func(actualRequest)).toStrictEqual(expectedResponse);
  });

  test('When called with response, return given response', () => {
    const func: MockReplyFunc<any> = assertAndReply({ b: 2 }, [500, { Success: false, ErrorMessage: 'Request failed with 500' }]);

    const actualRequest: AxiosRequestConfig = { params: { b: 2 } };
    const expectedResponse: MockResponse<any> = [500, { Success: false, ErrorMessage: 'Request failed with 500' }];

    expect(func(actualRequest)).toStrictEqual(expectedResponse);
  });

  test('Fail assertion when called with unexpected request', () => {
    const func: MockReplyFunc<{ a: number }> = assertAndReply({ b: 2 }, { a: 1 });

    const actualRequest: AxiosRequestConfig = { params: {} };

    expect.assertions(3);
    try {
      func(actualRequest);
    } catch (error) {
      expect(error.matcherResult.actual).toStrictEqual({});
      expect(error.matcherResult.expected).toStrictEqual({ b: 2 });
    }
  });
});
