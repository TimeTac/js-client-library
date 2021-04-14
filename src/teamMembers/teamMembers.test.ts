import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { ConfigProvider } from '../utils';
import { TeamMembersEndpoint } from './index';
import { TeamMember } from './types';

describe('TeamMembers', () => {
  const teamMembers: TeamMembersEndpoint = new TeamMembersEndpoint(new ConfigProvider({ account: 'testingAccount' }));
  const readPath = `${teamMembers.getResourcePath()}/read`;

  const mock = new AxiosMockAdapter(axios);
  let result: Promise<TeamMember[]>;

  afterEach(() => {
    mock.reset();
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = teamMembers.read();
    await result.then((result) => {
      expect(result).toStrictEqual([{}]);
    });
  });

  test('read with Success false', async () => {
    mock.onGet(readPath).reply(200, { Success: false });
    result = teamMembers.read();
    await result.catch((result) => {
      expect(result).toStrictEqual({ Success: false });
    });
  });

  test('read with status code 500', async () => {
    mock.onGet(readPath).reply(500);
    expect.assertions(1);
    await teamMembers.read().catch((err: { message: string }) => {
      expect(err.message).toMatch('Request failed with status code 500');
    });
  });
});
