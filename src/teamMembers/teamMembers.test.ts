import TeamMembers from './index';
import { TeamMember } from './types';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import RequestParams from '../utils/requestParams';

describe('TeamMembers', () => {
  var teamMembers: TeamMembers = new TeamMembers({});
  var readPath: string = `${teamMembers.getResourcePath()}/read`;
  var mock = new AxiosMockAdapter(axios);
  var result: Promise<TeamMember[]>;

  afterEach(() => {
    mock.reset();
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = teamMembers.read();
    await result.then((result) => expect(result).toStrictEqual([{}]));
  });

  test('read with Success false', async () => {
    mock.onGet(readPath).reply(200, { Success: false });
    result = teamMembers.read();
    await result.catch((result) => expect(result).toStrictEqual({ Success: false }));
  });

  test('read with status code 500', async () => {
    mock.onGet(readPath).reply(500);
    result = teamMembers.read();
    await result.then((result) => expect(result).toBe('Request failed with status code 500'));
  });
});
