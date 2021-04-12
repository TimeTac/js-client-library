import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { ConfigProvider } from '../utils';
import { ServerCommunicationEndpoint } from './index';
import { ServerCommunication as Model } from './types';

describe('ServerCommunication', () => {
  const serverCommunication: ServerCommunicationEndpoint = new ServerCommunicationEndpoint(
    new ConfigProvider({ account: 'testingAccount' })
  );
  const readPath = `${serverCommunication.getResourcePath()}/read`;
  const mock = new AxiosMockAdapter(axios);
  const account = 'placeholder';

  beforeAll(() => {
    jest.spyOn(serverCommunication, 'setAccount').mockImplementation(() => undefined);
  });

  afterAll(() => {
    mock.reset();
  });

  test('Call endpoint', async () => {
    mock.onGet(readPath).reply(200, {
      Success: true,
      NumResults: 1,
      Results: {
        host: 'testhost',
        authentication_type: 'AUTHORIZATION_CODE_GRANT',
      },
    });

    const result: Promise<Model> = serverCommunication.read(account);
    await result.then((result) => {
      expect(result).toStrictEqual({
        host: 'testhost',
        authentication_type: 'AUTHORIZATION_CODE_GRANT',
      });
    });
  });
});
