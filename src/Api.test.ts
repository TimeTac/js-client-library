import Api from './index';

describe('Api', () => {
  test('Check setConfig mutation', async () => {
    const testAccName = 'Lorem Ipsum';
    const api = new Api({
      account: testAccName,
    });

    expect(api.getConfig().account).toStrictEqual(testAccName);
    expect(api.serverCommunication.config.account).toStrictEqual(api.getConfig().account);

    api.serverCommunication.config.account = 'Ingens Ursus';
    expect(api.serverCommunication.config.account).toStrictEqual(api.getConfig().account);

    api.setConfig({
      account: 'Collum',
    });
    expect(api.serverCommunication.config.account).toStrictEqual(api.getConfig().account);
  });
});
