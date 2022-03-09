import { expect } from '@jest/globals';
import axios from 'axios';

import AxiosMockAdapter from 'axios-mock-adapter';
import { ConfigProvider } from '../utils';
import { LibraryReturn } from '../utils/response/apiResponse';
import { Country } from './types';
import { CountriesEndpoint } from './';

const MockData: {
  countriesReadResult: Country[];
} = {
  countriesReadResult: [
    {
      id: 1,
      name: 'Afghanistan',
    },
    {
      id: 2,
      name: 'Albania',
    },
    {
      id: 3,
      name: 'Algeria',
    },
  ],
};

describe('Countries', () => {
  const countries: CountriesEndpoint = new CountriesEndpoint(new ConfigProvider({ account: 'testingAccount' }));
  const readPath = `${countries.getResourcePath()}/read`;

  const mock = new AxiosMockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 3, Results: MockData.countriesReadResult });

    expect.assertions(1);

    await countries.read().then((results: LibraryReturn<'countries', Country[]>) => {
      expect(results).toStrictEqual({
        Results: MockData.countriesReadResult,
        Affected: {},
        Deleted: [],
      });
    });
  });
});
