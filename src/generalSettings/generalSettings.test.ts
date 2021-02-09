import { afterEach, describe, expect, test } from '@jest/globals';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { RequestParams } from '../utils/params/requestParams';
import { ReadRawResponse } from '../utils/response/readRawResponse';
import { GeneralSettingsEndpoint } from './index';
import { GeneralSetting } from './types';

describe('GeneralSettings', () => {
  const generalSettings: GeneralSettingsEndpoint = new GeneralSettingsEndpoint({ account: 'testingAccount' });
  const readPath = `${generalSettings.getResourcePath()}/read`;

  const mock = new AxiosMockAdapter(axios);
  let result: Promise<GeneralSetting[]> | null;
  let resultSingle: Promise<GeneralSetting> | null;
  let resultReadRaw: Promise<ReadRawResponse<GeneralSetting>> | null;

  afterEach(() => {
    mock.reset();
    result = null;
    resultSingle = null;
    resultReadRaw = null;
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = generalSettings.read();
    await result.then((result) => expect(result).toStrictEqual([{}]));
  });

  test('read with Success false', async () => {
    mock.onGet(readPath).reply(200, { Success: false });
    result = generalSettings.read();
    await result.catch((result) => expect(result).toStrictEqual({ Success: false }));
  });

  test('read with status code 500', async () => {
    mock.onGet(readPath).reply(500);
    expect.assertions(1);
    await generalSettings.read().catch((err) => expect(err.message).toMatch('Request failed with status code 500'));
  });

  test('readById', async () => {
    mock.onGet(`${readPath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = generalSettings.readById(1);
    await resultSingle.then((result) => expect(result).toStrictEqual({}));
  });

  test('readBySettingType', async () => {
    mock
      .onGet(`${readPath}`, { params: { setting_type: 'setting_foo', _op__setting_type: 'eq' } })
      .reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = generalSettings.readBySettingType('setting_foo');
    await resultSingle.then((result) => expect(result).toStrictEqual({}));
  });

  test('readRaw with no data', async () => {
    const current = new RequestParams<GeneralSetting>();
    mock.onGet(readPath).reply(200, { Success: true, Results: [{}] });
    resultReadRaw = generalSettings.readRaw(current);
    await resultReadRaw.then((result) => expect(result).toMatchObject({ data: {}, pages: {} }));
  });
});
