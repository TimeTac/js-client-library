import Api from './index';

describe('Api', () => {
  test('Check setConfig mutation', async () => {
    const testAccName = 'Lorem Ipsum';
    const api = new Api({
      account: testAccName,
    });

    expect(api.getConfig().account).toStrictEqual(testAccName);
    expect(api.serverCommunication.config.account).toStrictEqual(api.getConfig().account);

    const testAccName2 = 'Ingens Ursus';
    api.serverCommunication.config.account = testAccName2;
    expect(api.serverCommunication.config.account).toStrictEqual(testAccName2);
    expect(api.getConfig().account).toStrictEqual(testAccName2);

    const testAccName3 = 'Collum';
    api.setConfig({
      account: testAccName3,
    });
    expect(api.serverCommunication.config.account).toStrictEqual(testAccName3);
    expect(api.getConfig().account).toStrictEqual(testAccName3);
  });

  test('Check setAccount reference to right config', async () => {
    const testAccName = 'Humus';
    const api = new Api({
      account: testAccName,
    });

    api.serverCommunication.setAccount(testAccName);
    expect(api.serverCommunication.config.account).toStrictEqual(testAccName);
    expect(api.getConfig().account).toStrictEqual(testAccName);
  });
});
