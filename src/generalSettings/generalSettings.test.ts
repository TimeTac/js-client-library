import GeneralSettings from './index';
import { GeneralSetting } from './types';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { ApiResponseOnSuccess } from '../utils/response/apiResponse';

describe('GeneralSettings', () => {
  var generalSettings: GeneralSettings = new GeneralSettings({ account: 'testingAccount' });
  var readPath: string = `${generalSettings.getResourcePath()}/read`;
  var mock = new AxiosMockAdapter(axios);
  var result: Promise<GeneralSetting[]> | null;
  var resultSingle: Promise<GeneralSetting> | null;
  var resultRaw: Promise<ApiResponseOnSuccess<GeneralSetting[]>> | null;

  afterEach(() => {
    mock.reset();
    result = null;
    resultSingle = null;
    resultRaw = null;
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

  test('readRaw', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultRaw = generalSettings.readRaw();
    await resultRaw.then((result) => expect(result).toStrictEqual({ Success: true, NumResults: 1, Results: [{}] }));
  });
});
