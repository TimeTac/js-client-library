import { afterEach, describe, expect, test } from '@jest/globals';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { Absence } from '../absences/types';
import { AbsenceDurationUnit } from '../enums';
import { DeltaSyncParams } from '../utils/params/deltaSyncParams';
import { DeltaSyncResponse } from '../utils/response/deltaSyncResponse';
import { DeltaSyncEndpoint } from './index';
import { DeltaSyncResult } from './types';

describe('DeltaSync', () => {
  const deltaSync: DeltaSyncEndpoint = new DeltaSyncEndpoint({ account: 'testingAccount' });
  const readPath: string = `${deltaSync.getResourcePath()}/read`;

  const mock = new AxiosMockAdapter(axios);
  let result: Promise<DeltaSyncResponse> | null;

  afterEach(() => {
    mock.reset();
    result = null;
  });

  test('read without Results', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 0, Results: {} });
    result = deltaSync.read(new DeltaSyncParams());
    await result.then((result) => expect(result).toMatchObject({ success: true, results: {}, requestParams: new DeltaSyncParams() }));
  });

  test('read with Results', async () => {
    const record: Absence = {
      id: 1,
      type_id: 1,
      subtype_id: 0,
      user_id: 1,
      created: 'created',
      status: 1,
      updated: 'updated',
      from_date: 'from_date',
      to_date: 'to_date',
      duration_unit: AbsenceDurationUnit.Days,
      duration: 1,
    };

    const absences = {
      Success: true,
      NumResults: 10,
      ResourceName: 'absences',
      Results: [record],
    };

    const expectResults: DeltaSyncResult = {
      absences: {
        success: true,
        results: [record],
      },
    };

    mock.onGet(readPath).reply(200, { Success: true, NumResults: 0, Results: { absences } });
    result = deltaSync.read(new DeltaSyncParams());
    await result.then((result) =>
      expect(result).toMatchObject({ success: true, results: expectResults, requestParams: new DeltaSyncParams() })
    );
  });
});
