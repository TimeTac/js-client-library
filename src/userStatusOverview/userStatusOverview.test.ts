import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { UserStatusOverviewsEndpoint } from './index';
import { UserStatusOverview } from './types';

describe('UserStatusOverview', () => {
  const userStatusOverviews: UserStatusOverviewsEndpoint = new UserStatusOverviewsEndpoint({ account: 'testingAccount' });
  const readPath: string = `${userStatusOverviews.getResourcePath()}/read`;
  const mock = new AxiosMockAdapter(axios);

  let result: Promise<UserStatusOverview[]> | null;
  let resultSingle: Promise<UserStatusOverview> | null;

  afterEach(() => {
    mock.reset();
    result = null;
    resultSingle = null;
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = userStatusOverviews.read();
    await result.then((result) => expect(result).toStrictEqual([{}]));
  });

  test('read with Success false', async () => {
    mock.onGet(readPath).reply(200, { Success: false });
    result = userStatusOverviews.read();
    await result.catch((result) => expect(result).toStrictEqual({ Success: false }));
  });

  test('read with status code 500', async () => {
    mock.onGet(readPath).reply(500);
    expect.assertions(1);
    await userStatusOverviews.read().catch((err) => expect(err.message).toMatch('Request failed with status code 500'));
  });
  test('readById', async () => {
    mock.onGet(`${readPath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = userStatusOverviews.readById(1);
    await resultSingle.then((result) => expect(result).toStrictEqual({}));
  });
});
