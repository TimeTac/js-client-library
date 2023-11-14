import axios from 'axios';

import AxiosMockAdapter from 'axios-mock-adapter';
import { ConfigProvider } from '../utils';
import { JobQueueCreate } from './types';
import { JobQueuesEndpoint } from './index';

const fakePayload: JobQueueCreate = {
  task: '',
  params: {
    jobParams: [
      {
        name: '',
        value_text: '',
      },
    ],
  },
  run_at: '',
  scheduled_at: '',
};

const fakeResponse = [
  {
    jobQueues: [
      {
        id: 1,
        claimed_by: '',
        run_at: '',
        completed_at: '',
        scheduled_at: '',
        task: '',
        created_at: '',
        state: 1,
        tries: 1,
      },
    ],
  },
];
describe('jobQueuesEndpoint', () => {
  const clients = new JobQueuesEndpoint(new ConfigProvider({ account: 'testingAccount' }));
  const mock = new AxiosMockAdapter(axios);
  const createPath = `${clients.getResourcePath()}/create`;
  afterEach(() => {
    mock.reset();
  });

  test('create', async () => {
    mock.onPost(createPath).reply(200, { Success: true, NumResults: 1, Results: fakeResponse });
    const results = await clients.create(fakePayload);
    expect(results).toStrictEqual({
      Results: fakeResponse[0],
      Affected: {},
      Deleted: {},
    });
  });
});
