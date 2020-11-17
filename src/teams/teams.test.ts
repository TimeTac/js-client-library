import Teams from './index';
import { Team } from './types';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

describe('Teams', () => {
  var teams: Teams = new Teams({});
  var readPath: string = `${teams.getResourcePath()}/read`;
  var mock = new AxiosMockAdapter(axios);
  var result: Promise<Team[]>;

  afterEach(() => {
    mock.reset();
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = teams.read();
    await result.then((result) => expect(result).toStrictEqual([{}]));
  });

  test('read with Success false', async () => {
    mock.onGet(readPath).reply(200, { Success: false, ErrorMessage: 'No data' });
    expect.assertions(1);
    await teams.read().catch((err) => expect(err.ErrorMessage).toMatch('No data'));
  });

  test('read with status code 500', async () => {
    mock.onGet(readPath).reply(500);
    expect.assertions(1);
    await teams.read().catch((err) => expect(err.message).toMatch('Request failed with status code 500'));
  });
});
