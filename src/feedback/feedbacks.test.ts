import { describe, expect, test } from '@jest/globals';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { createMock } from 'ts-auto-mock';

import { ConfigProvider } from '../utils';
import { Feedback } from './types';
import { FeedbackEndpoint } from './';

const endpoint: FeedbackEndpoint = new FeedbackEndpoint(new ConfigProvider({ account: 'testingAccount' }));

describe('feedbacks', () => {
  const createPath = `${endpoint.getResourcePath()}/create`;

  test('create', async () => {
    const mock = new AxiosMockAdapter(axios);
    const result = createMock<Feedback>();
    const data = createMock<Feedback>();

    mock.onPost(createPath, data).reply(200, { Success: true, NumResults: 1, Results: [result] });
    const request = endpoint.create(data);

    expect(await request).toStrictEqual({
      Affected: {},
      Deleted: {},
      Results: result
    });
  });
});
