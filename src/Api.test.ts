import Api from './index';

describe('Api', () => {
  test('Check setConfig mutation', () => {
    const testAccName = 'Lorem Ipsum';
    const api = new Api({
      account: testAccName,
    });

    expect(api.config.data.account).toStrictEqual(testAccName);
    expect(api.serverCommunication.config.data.account).toStrictEqual(api.config.data.account);

    const testAccName2 = 'Ingens Ursus';
    api.serverCommunication.config.data.account = testAccName2;
    expect(api.serverCommunication.config.data.account).toStrictEqual(testAccName2);
    expect(api.config.data.account).toStrictEqual(testAccName2);

    const testAccName3 = 'Collum';
    api.config.setFields({
      account: testAccName3,
    });
    expect(api.serverCommunication.config.data.account).toStrictEqual(testAccName3);
    expect(api.config.data.account).toStrictEqual(testAccName3);
  });

  test('Check setAccount reference to right config', () => {
    const testAccName = 'Humus';
    const api = new Api({
      account: testAccName,
    });

    api.serverCommunication.setAccount(testAccName);
    expect(api.serverCommunication.config.data.account).toStrictEqual(testAccName);
    expect(api.config.data.account).toStrictEqual(testAccName);
  });
});
