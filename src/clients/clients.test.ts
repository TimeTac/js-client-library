import { expect } from '@jest/globals';
import axios from 'axios';

import AxiosMockAdapter from 'axios-mock-adapter';
import { ConfigProvider } from '../utils';
import { Client } from './types';
import { ClientsEndpoint } from './';

const mockData: {
  clientsReadResult: Client[];
} = {
  clientsReadResult: [
    {
      id: 21,
      company_name: 'FooBar Ltd',
      active: false,
      username: '',
      address_1: '',
      address_2: '',
      zip: '',
      city: '',
      country_id: '0',
      url: '',
      customer_number: 'A00001',
      contact_person_salutation_id: 0,
      contact_person_firstname: '',
      contact_person_lastname: '',
      contact_person_department: '',
      phone_1: '',
      phone_2: '',
      email_address: '',
    },
    {
      id: 2,
      company_name: 'ACME Inc',
      active: false,
      username: '',
      address_1: '',
      address_2: '',
      zip: '',
      city: '',
      country_id: '0',
      url: '',
      customer_number: 'A00002',
      contact_person_salutation_id: 0,
      contact_person_firstname: '',
      contact_person_lastname: '',
      contact_person_department: '',
      phone_1: '',
      phone_2: '',
      email_address: '',
    },
  ],
};

describe('Clients', () => {
  const clients: ClientsEndpoint = new ClientsEndpoint(new ConfigProvider({ account: 'testingAccount' }));
  const readPath = `${clients.getResourcePath()}/read`;

  const mock = new AxiosMockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 3, Results: mockData.clientsReadResult });

    const results = await clients.read();
    expect(results).toStrictEqual({
      Results: mockData.clientsReadResult,
      Affected: {},
      Deleted: {},
    });
  });
});
