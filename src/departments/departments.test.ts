import { expect } from '@jest/globals';
import axios from 'axios';

import AxiosMockAdapter from 'axios-mock-adapter';
import { ConfigProvider } from '../utils';
import { LibraryReturn } from '../utils/response/apiResponse';
import { ParsedErrorMessage } from '../utils/response/responseHandlers';
import { Department, DepartmentUpdate } from './types';
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
        Deleted: {},
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
        Deleted: {},
      });
    });
  });

  test('Update Batch Success', async () => {
    const mockedUpdateData = {
      id: 1,
      department_name: 'test',
    };
    const childResult = {
      Success: true,
      SuccessNested: true,
      NumResults: 1,
      NumResultsNested: 1,
      Results: [mockedUpdateData],
    };
    mock.onPut(updatePath).reply(200, {
      SuccessBatch: true,
      Success: true,
      NumResults: 1,
      Results: [childResult, childResult],
      _ignoreTypeGuard: true,
    });

    // No actual relevance to the test
    const updateData: DepartmentUpdate[] = [
      {
        id: 1,
        department_name: 'test',
      },
    ];
    const response = await departments.update(updateData);

    expect(response).toStrictEqual({ Affected: {}, Deleted: {}, Results: [mockedUpdateData, mockedUpdateData] });
  });

  test('Update test ApiResponseBatchOnFailure ', async () => {
    const failure = {
      Success: false,
      SuccessNested: false,
      Error: 422,
      ErrorMessage: 'Unprocessable Entity: department_id should be id of an existing department',
      ErrorExtended: {
        aErrorTranslationConstants: {
          '{{0}}': 'PM_DEPARTMENT_ID_MUST_EXIST',
        },
        errorCode: 'DEPARTMENT_ID_MUST_EXIST',
        errorString: 'department_id muss eine gültige id eines bestehenden departments sein',
        errorBaseString: '{{0}}',
      },
      ErrorInternal: 'Unprocessable Entity: department_id should be id of an existing department',
    };

    const updateData = {
      id: 1,
      department_name: '2',
    };

    const childResult = {
      Success: true,
      SuccessNested: true,
      NumResults: 1,
      NumResultsNested: 1,
      Results: [updateData],
    };

    mock
      .onPut(updatePath)
      .reply(200, { SuccessBatch: true, Success: true, NumResults: 1, Results: [childResult, failure], _ignoreTypeGuard: true });

    expect.assertions(1);

    // No relevance to the test
    const results = await departments.update([
      {
        id: 1,
        department_name: '2',
      },
    ]);

    expect(results).toStrictEqual({
      Affected: {},
      Deleted: {},
      Results: [
        updateData,
        {
          code: failure.Error,
          message: failure.ErrorExtended.errorString,
          response: failure,
          //This is just a workaround as stack if different per environment, so we are not really testing new Error().stack
          stack: (results.Results[1] as ParsedErrorMessage).stack,
        },
      ],
    });
  });
});
