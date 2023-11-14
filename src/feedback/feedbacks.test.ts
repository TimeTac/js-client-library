import { describe, expect, test } from '@jest/globals';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { ConfigProvider } from '../utils';
import { Feedback } from './types';
import { FeedbackEndpoint } from './';

const endpoint: FeedbackEndpoint = new FeedbackEndpoint(new ConfigProvider({ account: 'testingAccount' }));

const fakeResponse: Feedback[] = [
  {
    message: 'test',
  },
];

describe('feedbacks', () => {
  const createPath = `${endpoint.getResourcePath()}/create`;

  test('create', async () => {
    const mock = new AxiosMockAdapter(axios);
    const data = fakeResponse[0];

    mock.onPost(createPath, data).reply(200, { Success: true, NumResults: 1, Results: fakeResponse });
    const results = endpoint.create(data);

    expect(await results).toStrictEqual({
      Affected: {},
      Deleted: {},
      Results: fakeResponse[0],
    });
  });
});
