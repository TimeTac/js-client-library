import { expect } from '@jest/globals';
import axios from 'axios';

import AxiosMockAdapter from 'axios-mock-adapter';
import { ConfigProvider } from '../utils';
import { AutomaticBreakTemplate } from './types';
import { AutomaticBreakTemplatesEndpoint } from './';

const mockData: {
  automaticBreakTemplateReadResult: AutomaticBreakTemplate[];
} = {
  automaticBreakTemplateReadResult: [
    {
      id: 1,
      templateName: '30min ab 6h Arbeitszeit',
      dryRun: false,
      active: true,
    },
    {
      id: 4,
      templateName: '60min ab 6h Arbeitszeit',
      dryRun: false,
      active: true,
    },
    {
      id: 5,
      templateName: '30min ab 6h, 45min ab 9h Arbeitszeit',
      dryRun: true,
      active: true,
    },
    {
      id: 6,
      templateName: '15min ab 5,5h; 30min ab 7h; 60min ab 9h Arbeitszeit',
      dryRun: false,
      active: true,
    },
  ],
};

describe('AutomaticBreakTemplates', () => {
  const automaticBreakTemplates: AutomaticBreakTemplatesEndpoint = new AutomaticBreakTemplatesEndpoint(
    new ConfigProvider({ account: 'testingAccount' }),
  );
  const readPath = `${automaticBreakTemplates.getResourcePath()}/read`;

  const mock = new AxiosMockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 3, Results: mockData.automaticBreakTemplateReadResult });

    const results = await automaticBreakTemplates.read();
    expect(results).toStrictEqual({
      Results: mockData.automaticBreakTemplateReadResult,
      Affected: {},
      Deleted: {},
    });
  });
});
