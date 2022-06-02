import { describe, expect } from '@jest/globals';
import { getParsedErrorMessage } from './responseHandlers';

describe('Response handler', () => {
  it('parses ErrorExtended', () => {
    const apiResponse = {
      Success: false,
      RequestStartTime: 'MESSAGE_PLACE_HOLDER',
      Error: 999,
      ErrorMessage: 'MESSAGE_PLACE_HOLDER',
      ErrorExtended: {
        aErrorTranslationConstants: {},
        data: {},
        errorString: 'MESSAGE_PLACE_HOLDER',
        errorCode: 'PLACER_HOLDER',
        errorBaseString: 'PLACER_HOLDER',
      },
      ErrorInternal: 'PLACER_HOLDER',
    };

    const result = getParsedErrorMessage({
      ...apiResponse,
      Success: false,
    });

    expect(result).toStrictEqual({
      code: 999,
      message: 'MESSAGE_PLACE_HOLDER',
      response: apiResponse,
      stack: result.stack,
    });
  });
});
