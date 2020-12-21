import { ServerCommunicationEndpoint } from './index';
import { ServerCommunication as Model } from './types';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

describe('ServerCommunication', () => {
  const serverCommunication: ServerCommunicationEndpoint = new ServerCommunicationEndpoint({ account: 'testingAccount' });
  const readPath: string = `${serverCommunication.getResourcePath()}/read`;
  const mock = new AxiosMockAdapter(axios);
  const account: string = 'placeholder';

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

    let result: Promise<Model> = serverCommunication.read(account);
    await result.then((result) => {
      expect(result).toStrictEqual({
        host: 'testhost',
        authentication_type: 'AUTHORIZATION_CODE_GRANT',
      });
    });
  });
});
