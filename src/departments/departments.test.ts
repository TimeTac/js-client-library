import { expect } from '@jest/globals';
import axios from 'axios';

import AxiosMockAdapter from 'axios-mock-adapter';
import { ConfigProvider } from '../utils';
import { LibraryReturn } from '../utils/response/apiResponse';
import { Department } from './types';
import { DepartmentsEndpoint } from './';

const MockData = {
  departmentsReadResult: [
    {
      id: 1,
      department_name: 'Office',
      active: true,
      supervisor_id: 1,
      supervisor_assistant_id: 0,
      mother_id: 0,
      view_order: 1000000,
      node_path: ',1,',
      data_changed: '2022-01-23 11:51:26.0',
    },
    {
      id: 2,
      department_name: 'IT-Consulting',
      active: true,
      supervisor_id: 11,
      supervisor_assistant_id: 0,
      mother_id: 0,
      view_order: 2000000,
      node_path: ',2,',
      data_changed: '2022-02-04 12:32:45.0',
    },
    {
      id: 3,
      department_name: 'Change Management',
      active: true,
      supervisor_id: 1,
      supervisor_assistant_id: 0,
      mother_id: 0,
      view_order: 3000000,
      node_path: ',3,',
      data_changed: '2022-03-15 13:15:12.0',
    },
  ],
  departmentCreateData: {
    mother_id: 1,
    department_name: 'new dep',
  },
  departmentUpdateData: {
    id: 3,
    department_name: 'update_name',
  },
};

describe('Departments', () => {
  const departments: DepartmentsEndpoint = new DepartmentsEndpoint(new ConfigProvider({ account: 'testingAccount' }));
  const readPath = `${departments.getResourcePath()}/read`;
  const createPath = `${departments.getResourcePath()}/create`;
  const updatePath = `${departments.getResourcePath()}/update`;

  const mock = new AxiosMockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: MockData.departmentsReadResult });

    expect.assertions(1);

    await departments.read().then((results: LibraryReturn<'departments', Department[]>) => {
      expect(results).toStrictEqual({
        Results: MockData.departmentsReadResult,
        Affected: {},
        Deleted: [],
      });
    });
  });

  test('create', async () => {
    mock.onPost(createPath).reply(200, { Success: true, NumResults: 1, Results: MockData.departmentsReadResult });

    expect.assertions(1);

    await departments.create(MockData.departmentCreateData).then((results: LibraryReturn<'departments'>) => {
      expect(results).toStrictEqual({
        Results: MockData.departmentsReadResult[0],
        Affected: {},
        Deleted: [],
      });
    });
  });

  test('update', async () => {
    mock.onPut(updatePath).reply(200, { Success: true, NumResults: 1, Results: [], _ignoreTypeGuard: true });

    const results = await departments.update(MockData.departmentUpdateData);
    expect(results).toStrictEqual({ Affected: {}, Deleted: [], Results: [] });
  });
});
