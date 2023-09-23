import AxiosMockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { expect } from '@jest/globals';
import { ConfigProvider } from '../utils';
import { PublicHolidayTemplates } from './types';
import { PublicHolidayTemplatesEndpoint } from './index';

describe('PublicHolidayTemplateEndpoint', () => {
  const mockData: PublicHolidayTemplates[] = [
    {
      id: 1,
      iso_3166: 'myIso3166String',
      country_id: 2,
      is_default: false,
      source_id: 2,
      template_name: 'myTemplateName',
    },
  ];
  const publicHolidayTemplates: PublicHolidayTemplatesEndpoint = new PublicHolidayTemplatesEndpoint(
    new ConfigProvider({ account: 'testingAccount' }),
  );
  const readPath = `${publicHolidayTemplates.getResourcePath()}/read`;
  const mock = new AxiosMockAdapter(axios);
  afterEach(() => {
    mock.reset();
  });
  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 3, Results: mockData });
    const results = await publicHolidayTemplates.read();
    expect(results).toStrictEqual({
      Results: mockData,
      Affected: {},
      Deleted: [],
    });
  });
});
