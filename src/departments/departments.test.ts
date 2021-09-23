import { expect } from '@jest/globals';
import axios from 'axios';

import AxiosMockAdapter from 'axios-mock-adapter';
import { ConfigProvider } from '../utils';
import { Department } from './types';
import { DepartmentsEndpoint } from './';
import { LibraryReturn } from '../utils/response/apiResponse';

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

  const mock = new AxiosMockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: MockData.departmentsReadResult });

    expect.assertions(1);

    await departments.read().then((results: LibraryReturn<"departments", Department[]>) => {
      expect(results).toStrictEqual({
        Results: MockData.departmentsReadResult,
        Affected: {},
        Deleted: {}
      });
    });
  });

  test('create', async () => {
    mock.onPost(createPath).reply(200, { Success: true, NumResults: 1, Results: MockData.departmentsReadResult });

    expect.assertions(1);

    await departments.create(MockData.departmentCreateData).then((results: LibraryReturn<"departments">) => {
      expect(results).toStrictEqual(MockData.departmentsReadResult[0]);
    });
  });
});
