import { describe, expect, test } from '@jest/globals';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { createMock } from 'ts-auto-mock';

import { ConfigProvider } from '../utils';
import { FeedbackEndpoint } from './index';
import { FeedbackCreate, FeedbackResponse } from './types';

const endpoint: FeedbackEndpoint = new FeedbackEndpoint(new ConfigProvider({ account: 'testingAccount' }));

describe('feedbacks', () => {
  const createPath = `${endpoint.getResourcePath()}/create`;

  test('create', async () => {
    const mock = new AxiosMockAdapter(axios);
    const result = createMock<FeedbackResponse>();
    const data = createMock<FeedbackCreate>();

    mock.onPost(createPath, data).reply(200, { Success: true, NumResults: 1, Results: [result] });
    const request = endpoint.create(data);

    await request.then((result: FeedbackResponse) => {
      expect(result).toStrictEqual(result);
    });
  });
});
