import { expect } from '@jest/globals';
import axios from 'axios';

import AxiosMockAdapter from 'axios-mock-adapter';
import { ConfigProvider } from '../../utils';
import { PermissionResolveAbsenceTypesAndUser } from './types';
import { PermissionResolveAbsenceTypesAndUsersEndpoint } from './index';

const mockData: {
  permissionResolveAbsenceTypesAndUserData: PermissionResolveAbsenceTypesAndUser[];
} = {
  permissionResolveAbsenceTypesAndUserData: [
    {
      id: 1,
      inherited_user_ids: '1,2,3',
      resolve_absence_subtype_id: 1,
      resolve_absence_subtype_wildcard: '*',
      resolve_absence_type_id: 1,
      resolve_absence_type_wildcard: '*',
      resolve_question_id: 1,
      resolve_user_wildcard: '*',
      subject_user_id: 1,
      resolve_user_id: 1,
    },
    {
      id: 2,
      inherited_user_ids: '1,2,3',
      resolve_absence_subtype_id: 2,
      resolve_absence_subtype_wildcard: '*',
      resolve_absence_type_id: 2,
      resolve_absence_type_wildcard: '*',
      resolve_question_id: 2,
      resolve_user_wildcard: '*',
      subject_user_id: 2,
      resolve_user_id: 2,
    },
    {
      id: 3,
      inherited_user_ids: '1,2,3',
      resolve_absence_subtype_id: 3,
      resolve_absence_subtype_wildcard: '*',
      resolve_absence_type_id: 3,
      resolve_absence_type_wildcard: '*',
      resolve_question_id: 3,
      resolve_user_wildcard: '*',
      subject_user_id: 3,
      resolve_user_id: 3,
    },
  ],
};

describe('PermissionResolveAbsenceTypesAndUser', () => {
  const clients: PermissionResolveAbsenceTypesAndUsersEndpoint = new PermissionResolveAbsenceTypesAndUsersEndpoint(
    new ConfigProvider({ account: 'testingAccount' }),
  );
  const readPath = `${clients.getResourcePath()}/read`;
  const mock = new AxiosMockAdapter(axios);
  afterEach(() => {
    mock.reset();
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 3, Results: mockData.permissionResolveAbsenceTypesAndUserData });

    const results = await clients.read();
    expect(results).toStrictEqual({
      Results: mockData.permissionResolveAbsenceTypesAndUserData,
      Affected: {},
      Deleted: [],
    });
  });
});
