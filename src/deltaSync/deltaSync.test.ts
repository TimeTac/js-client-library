import { afterEach, describe, expect, test } from '@jest/globals';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { Absence } from '../absences/types';
import { AbsenceDurationUnit } from '../enums';
import { DeltaSyncParams } from '../utils/params/deltaSyncParams';
import { DeltaSyncResponse } from '../utils/response/deltaSyncResponse';
import { DeletedEntry } from '../utils/response/resourceResponse';
import { DeltaSyncEndpoint } from './index';
import { DeltaSyncResults } from './types';

describe('DeltaSync', () => {
  const deltaSync: DeltaSyncEndpoint = new DeltaSyncEndpoint({ account: 'testingAccount' });
  const readPath = `${deltaSync.getResourcePath()}/read`;

  const mock = new AxiosMockAdapter(axios);
  let result: Promise<DeltaSyncResponse> | null;

  afterEach(() => {
    mock.reset();
    result = null;
  });

  test('read without results', async () => {
    mock.onGet(readPath).reply(200, { Success: true, Results: {} });
    result = deltaSync.read(new DeltaSyncParams());
    await result.then((result) => expect(result).toMatchObject({ success: true, results: {} }));
  });

  test('read with one result', async () => {
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

    const deltedRecord: DeletedEntry = {
      id: 1,
      deleted_at: 'deleted_at',
    };

    const absencesFromServer = {
      Host: 'Host',
      Codeversion: 'Codeversion',
      Success: true,
      SuccessNested: true,
      ResourceName: 'ResourceName',
      RequestStartTime: 'RequestStartTime',
      RequestEndTime: 'RequestEndTime',
      ServerTimeZone: 'ServerTimeZone',
      Results: [record],
      Deleted: [deltedRecord],
    };

    const expectResults: DeltaSyncResults = {
      absences: {
        success: true,
        apiResponse: {
          Host: 'Host',
          Codeversion: 'Codeversion',
          Success: true,
          SuccessNested: true,
          ResourceName: 'ResourceName',
          RequestStartTime: 'RequestStartTime',
          RequestEndTime: 'RequestEndTime',
          ServerTimeZone: 'ServerTimeZone',
        },
        results: [record],
        deleted: [deltedRecord],
        affected: {},
      },
    };

    mock.onGet(readPath).reply(200, { Success: true, Results: { absences: absencesFromServer } });
    result = deltaSync.read(new DeltaSyncParams());
    await result.then((result) => expect(result).toMatchObject({ success: true, results: expectResults }));
  });
});
