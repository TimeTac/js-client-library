import { expect } from '@jest/globals';
import axios from 'axios';

import AxiosMockAdapter from 'axios-mock-adapter';
import { ConfigProvider } from '../utils';
import { Account } from './types';
import { AccountEndpoint } from './';

const mockData: {
  accountReadResult: Account;
} = {
  accountReadResult: {
    signupform_username: 'max',
    signupform_companyname: 'dev',
    signupform_firstname: 'Max',
    signupform_lastname: 'Mustermann',
    signupform_email: 'noreply@timetac.com',
    signupform_street: '',
    signupform_zipcode: '',
    signupform_city: '',
    vat_number: '',
    payment_option: '',
    technical_contact_email: 'max.mustermann@timetac.com',
    demoaccount_until: '2022-12-31',
    paid_version: '0',
  },
};

describe('Account', () => {
  const account: AccountEndpoint = new AccountEndpoint(new ConfigProvider({ account: 'testingAccount' }));
  const readPath = `${account.getResourcePath()}/read`;

  const mock = new AxiosMockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  test('readAccountData', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 13, Results: mockData.accountReadResult });

    const results = await account.read();
    expect(results).toStrictEqual({
      Results: mockData.accountReadResult,
      Affected: {},
      Deleted: [],
    });
  });
});
