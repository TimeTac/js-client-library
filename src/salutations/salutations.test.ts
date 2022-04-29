import { expect } from '@jest/globals';
import axios from 'axios';

import AxiosMockAdapter from 'axios-mock-adapter';
import { ConfigProvider } from '../utils';
import { Salutation } from './types';
import { SalutationsEndpoint } from './';

const mockData: {
  salutationsReadResult: Salutation[];
} = {
  salutationsReadResult: [
    {
      id: 1,
      const: 'PM_SALUTATION_UNIVERAL',
      gender: '',
    },
    {
      id: 2,
      const: 'PM_SALUTATION_MALE',
      gender: 'm',
    },
    {
      id: 3,
      const: 'PM_SALUTATION_FEMALE',
      gender: 'f',
    },
  ],
};

describe('Salutations', () => {
  const salutations: SalutationsEndpoint = new SalutationsEndpoint(new ConfigProvider({ account: 'testingAccount' }));
  const readPath = `${salutations.getResourcePath()}/read`;

  const mock = new AxiosMockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 3, Results: mockData.salutationsReadResult });

    const results = await salutations.read();
    expect(results).toStrictEqual({
      Results: mockData.salutationsReadResult,
      Affected: {},
      Deleted: [],
    });
  });
});
