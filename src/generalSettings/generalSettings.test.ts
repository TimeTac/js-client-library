import GeneralSettings from './index';
import { GeneralSetting } from './types';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import RequestParams from '../utils/requestParams';

describe('GeneralSettings', () => {
  var generalSettings: GeneralSettings = new GeneralSettings({});
  var readPath: string = `${generalSettings.getResourcePath()}/read`;
  var mock = new AxiosMockAdapter(axios);
  var result: Promise<GeneralSetting[]> | null;
  var resultSingle: Promise<GeneralSetting> | null;

  afterEach(() => {
    mock.reset();
    result = null;
    resultSingle = null;
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
    result = generalSettings.read();
    await result.then((result) => expect(result).toBe('Request failed with status code 500'));
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
});
